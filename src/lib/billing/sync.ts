import type Stripe from "stripe";

export type Plan = "free" | "pro";

/** Statuses that keep Pro. past_due keeps access while Stripe retries the card. */
const PRO_STATUSES = new Set<Stripe.Subscription.Status>(["active", "trialing", "past_due"]);

export const planFor = (status: Stripe.Subscription.Status): Plan => (PRO_STATUSES.has(status) ? "pro" : "free");

export interface ProfilePatch {
  stripe_subscription_id: string;
  subscription_status: Stripe.Subscription.Status;
  plan: Plan;
  current_period_end: string | null;
}

const idOf = (v: string | { id: string } | null | undefined) => (typeof v === "string" ? v : (v?.id ?? null));

/**
 * The profile fields a subscription implies. Since API 2025-03-31 the billing
 * period lives on each subscription item, so take the latest item end.
 */
export function profileFromSubscription(sub: Stripe.Subscription): ProfilePatch {
  const ends = sub.items.data.map((i) => i.current_period_end).filter((n): n is number => typeof n === "number");
  return {
    stripe_subscription_id: sub.id,
    subscription_status: sub.status,
    plan: planFor(sub.status),
    current_period_end: ends.length ? new Date(Math.max(...ends) * 1000).toISOString() : null,
  };
}

export interface BillingStore {
  alreadyProcessed(eventId: string): Promise<boolean>;
  markProcessed(eventId: string, type: string): Promise<void>;
  /** Remember which Stripe customer belongs to which user (from checkout). */
  linkCheckout(userId: string, customerId: string): Promise<void>;
  updateByCustomer(customerId: string, patch: ProfilePatch): Promise<void>;
}

export interface BillingDeps {
  retrieveSubscription(id: string): Promise<Stripe.Subscription>;
  store: BillingStore;
}

/** Throws unless the payload carries a valid Stripe signature for `secret`. */
export function verifyStripeEvent(stripe: Stripe, payload: string, signature: string | null, secret: string) {
  if (!signature) throw new Error("Missing Stripe-Signature header");
  return stripe.webhooks.constructEvent(payload, signature, secret);
}

/** Re-read the subscription from Stripe and save it: events can arrive out of order. */
async function syncSubscription(subscriptionId: string, deps: BillingDeps) {
  const sub = await deps.retrieveSubscription(subscriptionId);
  const customerId = idOf(sub.customer);
  if (customerId) await deps.store.updateByCustomer(customerId, profileFromSubscription(sub));
}

/** Applies one verified Stripe event to the profiles table. Safe to call twice with the same event. */
export async function handleStripeEvent(event: Stripe.Event, deps: BillingDeps) {
  if (await deps.store.alreadyProcessed(event.id)) return;

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const customerId = idOf(session.customer);
      const subscriptionId = idOf(session.subscription);
      if (session.mode !== "subscription" || !session.client_reference_id || !customerId || !subscriptionId) break;
      await deps.store.linkCheckout(session.client_reference_id, customerId);
      await syncSubscription(subscriptionId, deps);
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await syncSubscription(event.data.object.id, deps);
      break;
    case "invoice.payment_failed": {
      const subscriptionId = idOf(event.data.object.parent?.subscription_details?.subscription);
      if (subscriptionId) await syncSubscription(subscriptionId, deps);
      break;
    }
    default:
      return;
  }
  await deps.store.markProcessed(event.id, event.type);
}
