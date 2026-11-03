import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import { GITHUB_URL } from "../_site/links";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    blurb: "Everything in the open-source library.",
    features: [
      "Every section, plain and motion",
      "Install with the shadcn CLI",
      "Docs, playground and Storybook",
      "MIT license",
    ],
    cta: { label: "Browse sections", href: "/docs/sections", external: false },
    featured: false,
  },
  {
    name: "Pro",
    price: "Coming soon",
    period: "yearly plan",
    blurb: "For shipping whole pages, not just sections.",
    features: [
      "Full page templates, motion and plain",
      "Premium motion sections",
      "Figma kit",
      "A year of new templates and updates",
    ],
    cta: { label: "Star to hear when it launches", href: GITHUB_URL, external: true },
    featured: true,
  },
];

/** Free vs Pro. Pro has no price yet, so it shows "Coming soon" instead of a number. */
export function Pricing() {
  return (
    <ul className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
      {PLANS.map((plan) => (
        <li
          key={plan.name}
          aria-label={plan.name}
          className={cn(
            "flex flex-col rounded-2xl border bg-card p-7",
            plan.featured && "border-brand/50 shadow-[0_20px_80px_-30px_color-mix(in_oklch,var(--brand)_45%,transparent)]",
          )}
        >
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{plan.blurb}</p>
          <p className="mt-6 flex items-baseline gap-2">
            <span className={cn("font-semibold tracking-tight", plan.price.startsWith("$") ? "text-4xl" : "text-2xl text-brand")}>
              {plan.price}
            </span>
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                {f}
              </li>
            ))}
          </ul>
          <Button asChild variant={plan.featured ? "default" : "outline"} className="mt-8">
            {plan.cta.external ? <a href={plan.cta.href}>{plan.cta.label}</a> : <Link href={plan.cta.href}>{plan.cta.label}</Link>}
          </Button>
        </li>
      ))}
    </ul>
  );
}
