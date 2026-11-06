import { getStripe } from "@/lib/billing/stripe";
import { proConfig } from "@/lib/pro-config";
import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Opens the Stripe billing portal (cancel, change card, invoices) for the signed-in subscriber. */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (!proConfig().enabled) return NextResponse.redirect(`${origin}/account`, 303);
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(`${origin}/login?next=/account`, 303);
  // RLS: the user can read only their own profile.
  const { data: profile } = await supabase.from("profiles").select("stripe_customer_id").eq("id", user.id).single();
  if (!profile?.stripe_customer_id) return NextResponse.redirect(`${origin}/account`, 303);
  const portal = await getStripe().billingPortal.sessions.create({ customer: profile.stripe_customer_id, return_url: `${origin}/account` });
  return NextResponse.redirect(portal.url, 303);
}
