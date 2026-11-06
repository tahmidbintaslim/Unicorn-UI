/**
 * Tapas Pro configuration, read from the environment. Pro features switch on
 * only when every value is set, so the open-source site builds and runs
 * without any accounts. See docs/pro-setup.md.
 */
export const PRO_PRICE_LABEL = "$49";

export function proConfig() {
  const env = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    supabaseSecret: process.env.SUPABASE_SECRET_KEY,
    stripeSecret: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
  };
  const missing = Object.entries(env)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  return { ...env, enabled: missing.length === 0, missing, testMode: !!env.stripeSecret?.startsWith("sk_test_") };
}

/** Whether sign-in and checkout are available. Safe to call on the client: only reads public values. */
export const authConfigured = () => !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
