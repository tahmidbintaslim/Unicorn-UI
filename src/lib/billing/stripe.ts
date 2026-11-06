import Stripe from "stripe";

let client: Stripe | undefined;

/** Server-side Stripe client, created on first use. */
export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not set");
  client ??= new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}
