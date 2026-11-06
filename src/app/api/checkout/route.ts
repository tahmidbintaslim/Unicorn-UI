import { getStripe } from "@/lib/billing/stripe";
import { proConfig } from "@/lib/pro-config";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Starts Stripe Checkout for Pro (yearly subscription). Signed-out visitors go to sign-in first. */
export async function POST(request: Request) {
  const config = proConfig();
  const origin = new URL(request.url).origin;
  if (!config.enabled) return NextResponse.redirect(`${origin}/#pricing`, 303);

  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(`${origin}/login?next=/account`, 303);

  const admin = supabaseAdmin();
  const { data: profile } = await admin.from("profiles").select("stripe_customer_id, plan").eq("id", user.id).single();
  if (profile?.plan === "pro") return NextResponse.redirect(`${origin}/account`, 303);

  const stripe = getStripe();
  let customerId = profile?.stripe_customer_id as string | null | undefined;
  if (!customerId) {
    const customer = await stripe.customers.create({ email: user.email, metadata: { user_id: user.id } });
    customerId = customer.id;
    await admin.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: user.id,
    line_items: [{ price: config.stripePriceId!, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${origin}/account?checkout=success`,
    cancel_url: `${origin}/#pricing`,
  });
  return NextResponse.redirect(session.url!, 303);
}
