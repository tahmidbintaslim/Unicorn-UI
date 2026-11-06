// @vitest-environment node
import Stripe from "stripe";
import { describe, expect, it, vi } from "vitest";

const SECRET = "whsec_route_test";
const handled: string[] = [];
vi.mock("@/lib/pro-config", () => ({ proConfig: () => ({ enabled: true, stripeWebhookSecret: SECRET }) }));
vi.mock("@/lib/billing/stripe", () => ({ getStripe: () => new Stripe("sk_test_dummy") }));
vi.mock("@/lib/supabase/admin", () => ({ supabaseAdmin: () => ({}) }));
vi.mock("@/lib/billing/store", () => ({ supabaseBillingStore: () => ({}) }));
vi.mock("@/lib/billing/sync", async (orig) => ({
  ...(await orig<typeof import("@/lib/billing/sync")>()),
  handleStripeEvent: async (e: { id: string }) => void handled.push(e.id),
}));

const { POST } = await import("./route");
const stripe = new Stripe("sk_test_dummy");

describe("POST /api/webhooks/stripe", () => {
  it("handles a correctly signed event", async () => {
    const payload = JSON.stringify({ id: "evt_ok", type: "customer.subscription.updated", data: { object: {} } });
    const sig = stripe.webhooks.generateTestHeaderString({ payload, secret: SECRET });
    const res = await POST(new Request("http://x", { method: "POST", body: payload, headers: { "stripe-signature": sig } }));
    expect(res.status).toBe(200);
    expect(handled).toContain("evt_ok");
  });
  it("rejects a forged event with 400 and does not handle it", async () => {
    const payload = JSON.stringify({ id: "evt_forged", type: "customer.subscription.updated", data: { object: {} } });
    const sig = stripe.webhooks.generateTestHeaderString({ payload, secret: "whsec_wrong" });
    const res = await POST(new Request("http://x", { method: "POST", body: payload, headers: { "stripe-signature": sig } }));
    expect(res.status).toBe(400);
    expect(handled).not.toContain("evt_forged");
  });
});
