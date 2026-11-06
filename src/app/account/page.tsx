import { Button } from "@/components/ui/button";
import { PRO_PRICE_LABEL, proConfig } from "@/lib/pro-config";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SiteFooter } from "../_site/site-footer";
import { SiteHeader } from "../_site/site-header";
import { TokenPanel } from "./token-panel";

export const metadata = { title: "Account | Tapas UI", robots: { index: false } };
export const dynamic = "force-dynamic";

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : null);

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ checkout?: string }> }) {
  const config = proConfig();
  if (!config.enabled) redirect("/");
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  // RLS: these reads only ever return the signed-in user's rows.
  const [{ data: profile }, { count }] = await Promise.all([
    supabase.from("profiles").select("plan, subscription_status, current_period_end, stripe_customer_id, github_login").eq("id", user.id).single(),
    supabase.from("registry_tokens").select("id", { count: "exact", head: true }).is("revoked_at", null),
  ]);
  const { checkout } = await searchParams;
  const isPro = profile?.plan === "pro";
  const card = "rounded-2xl border bg-card p-6";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-16 sm:px-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Account</h1>
            <p className="mt-1 text-muted-foreground">Signed in as {profile?.github_login ?? user.email}</p>
          </div>
          <form action="/auth/signout" method="post">
            <Button variant="ghost" size="sm">
              Sign out
            </Button>
          </form>
        </header>

        {config.testMode && (
          <p className="rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
            Pro is in Stripe test mode: no real charges. Use card 4242 4242 4242 4242, any future date and any CVC.
          </p>
        )}
        {checkout === "success" && !isPro && (
          <p role="status" className="rounded-lg border px-4 py-3 text-sm">
            Payment received. Your plan updates in a few seconds; refresh if it still says Free.
          </p>
        )}

        <section aria-labelledby="plan-title" className={card}>
          <h2 id="plan-title" className="text-lg font-semibold">
            Plan: {isPro ? "Pro" : "Free"}
          </h2>
          {isPro ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {profile?.subscription_status === "past_due" ? "Your last payment failed; update your card to keep Pro. " : ""}
              {fmt(profile?.current_period_end ?? null) && `Renews ${fmt(profile!.current_period_end)}.`}
            </p>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">Pro adds premium templates, premium motion sections and the Figma kit.</p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            {isPro || profile?.stripe_customer_id ? (
              <form action="/api/portal" method="post">
                <Button variant="outline">Manage billing</Button>
              </form>
            ) : null}
            {!isPro && (
              <form action="/api/checkout" method="post">
                <Button>Get Pro, {PRO_PRICE_LABEL}/year</Button>
              </form>
            )}
          </div>
        </section>

        {isPro && (
          <section aria-labelledby="registry-title" className={card}>
            <h2 id="registry-title" className="text-lg font-semibold">
              Pro registry token
            </h2>
            <div className="mt-3">
              <TokenPanel hasToken={(count ?? 0) > 0} />
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
