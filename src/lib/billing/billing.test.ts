// @vitest-environment node
import Stripe from "stripe";
import { describe, expect, it, vi } from "vitest";
import { createRegistryToken, hashToken } from "./tokens";
import { handleStripeEvent, planFor, profileFromSubscription, verifyStripeEvent, type BillingDeps } from "./sync";

const stripe = new Stripe("sk_test_dummy");
const SECRET = "whsec_test_secret";

/** A real Stripe-signed payload, as the webhook route receives it. */
function signed(event: object) {
  const payload = JSON.stringify(event);
  return { payload, header: stripe.webhooks.generateTestHeaderString({ payload, secret: SECRET }) };
}

const sub = (over: Partial<Stripe.Subscription> = {}) =>
  ({
    id: "sub_1",
    object: "subscription",
    customer: "cus_1",
    status: "active",
    items: { object: "list", data: [{ id: "si_1", current_period_end: 1893456000 }] },
    ...over,
  }) as unknown as Stripe.Subscription;

function fakeDeps(subscription = sub()) {
  const processed = new Set<string>();
  const deps: BillingDeps & { updates: unknown[]; links: unknown[] } = {
    updates: [],
    links: [],
    retrieveSubscription: vi.fn(async () => subscription),
    store: {
      alreadyProcessed: async (id) => processed.has(id),
      markProcessed: async (id) => void processed.add(id),
      linkCheckout: async (userId, customerId) => void deps.links.push({ userId, customerId }),
      updateByCustomer: async (customerId, patch) => void deps.updates.push({ customerId, ...patch }),
    },
  };
  return deps;
}

describe("registry tokens", () => {
  it("are random, prefixed and stored only as a SHA-256 hash", () => {
    const a = createRegistryToken();
    const b = createRegistryToken();
    expect(a.token).toMatch(/^tapas_pro_[A-Za-z0-9_-]{40,}$/);
    expect(a.token).not.toBe(b.token);
    expect(a.hash).toBe(hashToken(a.token));
    expect(a.hash).toMatch(/^[0-9a-f]{64}$/);
    expect(a.hash).not.toContain(a.token);
  });
});

describe("plan from subscription", () => {
  it.each([
    ["active", "pro"],
    ["trialing", "pro"],
    ["past_due", "pro"],
    ["canceled", "free"],
    ["unpaid", "free"],
    ["incomplete", "free"],
    ["incomplete_expired", "free"],
  ] as const)("%s → %s", (status, plan) => {
    expect(planFor(status)).toBe(plan);
  });

  it("reads the period end from the subscription items (API 2026-10-28)", () => {
    expect(profileFromSubscription(sub())).toEqual({
      stripe_subscription_id: "sub_1",
      subscription_status: "active",
      plan: "pro",
      current_period_end: new Date(1893456000 * 1000).toISOString(),
    });
  });
});

describe("webhook verification", () => {
  it("accepts a correctly signed payload", () => {
    const { payload, header } = signed({ id: "evt_1", type: "customer.subscription.updated", data: { object: sub() } });
    expect(verifyStripeEvent(stripe, payload, header, SECRET).id).toBe("evt_1");
  });

  it("rejects a tampered payload", () => {
    const { header } = signed({ id: "evt_1", type: "x", data: { object: {} } });
    expect(() => verifyStripeEvent(stripe, JSON.stringify({ id: "evt_2" }), header, SECRET)).toThrow();
  });

  it("rejects a missing signature", () => {
    expect(() => verifyStripeEvent(stripe, "{}", null, SECRET)).toThrow(/signature/i);
  });
});

describe("handleStripeEvent", () => {
  it("checkout.session.completed links the customer to the user and syncs the subscription", async () => {
    const deps = fakeDeps();
    const event = {
      id: "evt_c",
      type: "checkout.session.completed",
      data: { object: { object: "checkout.session", mode: "subscription", client_reference_id: "user-1", customer: "cus_1", subscription: "sub_1" } },
    } as unknown as Stripe.Event;
    await handleStripeEvent(event, deps);
    expect(deps.links).toEqual([{ userId: "user-1", customerId: "cus_1" }]);
    expect(deps.updates).toEqual([{ customerId: "cus_1", ...profileFromSubscription(sub()) }]);
  });

  it("subscription events re-read the subscription from Stripe, so out-of-order events end on the true state", async () => {
    const deps = fakeDeps(sub({ status: "canceled" }));
    const stale = { id: "evt_u", type: "customer.subscription.updated", data: { object: sub({ status: "active" }) } } as unknown as Stripe.Event;
    await handleStripeEvent(stale, deps);
    expect(deps.retrieveSubscription).toHaveBeenCalledWith("sub_1");
    expect(deps.updates).toEqual([expect.objectContaining({ customerId: "cus_1", plan: "free", subscription_status: "canceled" })]);
  });

  it("customer.subscription.deleted downgrades to free", async () => {
    const deps = fakeDeps(sub({ status: "canceled" }));
    await handleStripeEvent({ id: "evt_d", type: "customer.subscription.deleted", data: { object: sub() } } as unknown as Stripe.Event, deps);
    expect(deps.updates).toEqual([expect.objectContaining({ plan: "free" })]);
  });

  it("invoice.payment_failed syncs the invoice's subscription", async () => {
    const deps = fakeDeps(sub({ status: "past_due" }));
    const event = {
      id: "evt_i",
      type: "invoice.payment_failed",
      data: { object: { object: "invoice", customer: "cus_1", parent: { type: "subscription_details", subscription_details: { subscription: "sub_1" } } } },
    } as unknown as Stripe.Event;
    await handleStripeEvent(event, deps);
    expect(deps.updates).toEqual([expect.objectContaining({ subscription_status: "past_due", plan: "pro" })]);
  });

  it("ignores an event it has already processed", async () => {
    const deps = fakeDeps();
    const event = { id: "evt_same", type: "customer.subscription.updated", data: { object: sub() } } as unknown as Stripe.Event;
    await handleStripeEvent(event, deps);
    await handleStripeEvent(event, deps);
    expect(deps.updates).toHaveLength(1);
  });

  it("ignores unrelated event types", async () => {
    const deps = fakeDeps();
    await handleStripeEvent({ id: "evt_x", type: "charge.refunded", data: { object: {} } } as unknown as Stripe.Event, deps);
    expect(deps.updates).toHaveLength(0);
  });
});
