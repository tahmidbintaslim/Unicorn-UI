import { supabaseBillingStore } from "@/lib/billing/store";
import { getStripe } from "@/lib/billing/stripe";
import { handleStripeEvent, verifyStripeEvent } from "@/lib/billing/sync";
import { proConfig } from "@/lib/pro-config";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/** Stripe webhook: verifies the signature, then syncs the subscriber's profile. */
export async function POST(request: Request) {
  const config = proConfig();
  if (!config.enabled) return new Response("Pro is not configured", { status: 503 });
  const stripe = getStripe();
  const payload = await request.text();
  let event;
  try {
    event = verifyStripeEvent(stripe, payload, request.headers.get("stripe-signature"), config.stripeWebhookSecret!);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }
  try {
    await handleStripeEvent(event, {
      retrieveSubscription: (id) => stripe.subscriptions.retrieve(id),
      store: supabaseBillingStore(supabaseAdmin()),
    });
  } catch (err) {
    // A 500 makes Stripe retry; the event id is only marked processed on success.
    console.error("stripe webhook failed", event.id, err);
    return new Response("Webhook handler failed", { status: 500 });
  }
  return Response.json({ received: true });
}
