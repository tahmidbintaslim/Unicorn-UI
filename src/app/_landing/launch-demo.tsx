"use client";

import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";
import React from "react";

// Same shape check as the real waitlist route (src/app/examples/_lib/waitlist.ts).
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEPS = ["Email checked", "Spam trap passed", "Ready to store in your email list"];

/**
 * The hero's "try it" panel: a waitlist form that walks through what the real
 * route does, and a link to a Stripe test checkout. Demo only: it sends nothing.
 */
export function LaunchDemo({ checkoutHref }: { checkoutHref: string }) {
  const id = React.useId();
  const [result, setResult] = React.useState<"ok" | "invalid" | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    setResult(EMAIL.test(email) ? "ok" : "invalid");
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-2xl border bg-card/80 p-5 text-left shadow-[0_30px_100px_-40px_color-mix(in_oklch,var(--saffron)_50%,transparent)] backdrop-blur sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">Try the waitlist section</p>
      {/* noValidate: the demo shows the section's own error message, not the browser's. */}
      <form onSubmit={submit} noValidate className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11 min-w-0 rounded-md border bg-background px-3 text-base outline-none focus-visible:border-brand focus-visible:ring-[3px] focus-visible:ring-brand/30 sm:flex-1 sm:text-sm"
        />
        <Button type="submit" className="h-11 bg-brand text-brand-foreground hover:bg-brand/90">
          Join the waitlist
        </Button>
      </form>
      <div role="status" className="mt-3 min-h-[5.5rem] text-sm">
        {result === "invalid" && <p className="text-paprika">That email doesn&apos;t look right. Please check it and try again.</p>}
        {result === "ok" && (
          <>
            <ul className="space-y-1.5">
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-2 motion-safe:animate-[launch-step_0.4s_ease-out_both]" style={{ animationDelay: `${i * 0.25}s` }}>
                  <Check aria-hidden="true" className="size-4 text-olive" />
                  {step}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">This is a demo, so nothing was stored. In your project the same form posts to your API route.</p>
          </>
        )}
        {result === null && (
          <p className="text-muted-foreground">Submit an email to see what the section does for you. Nothing is stored here.</p>
        )}
      </div>
      <a
        href={checkoutHref}
        className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
      >
        <CreditCard aria-hidden="true" className="size-4" />
        Or try the Stripe test checkout (no real charge)
      </a>
    </div>
  );
}
