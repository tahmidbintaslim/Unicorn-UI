import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

export interface PricingPlan {
  name: string;
  description?: string;
  /** Price per month on monthly billing */
  monthly: number;
  /** Price per year on yearly billing */
  yearly: number;
  features: string[];
  /** `yearlyHref` (optional) is used while the yearly period is selected, such as a yearly checkout link. */
  cta: { label: string; href: string; yearlyHref?: string };
  popular?: boolean;
}

export interface PricingTableProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  plans: PricingPlan[];
  currency?: string;
  monthlyLabel?: string;
  yearlyLabel?: string;
  /** Short note beside the yearly option, such as "2 months free" */
  yearlyNote?: string;
}

/** One price, shown or hidden by the period switch. */
export function PlanPrice({ plan, period, currency }: { plan: PricingPlan; period: "monthly" | "yearly"; currency: string }) {
  const amount = period === "monthly" ? plan.monthly : plan.yearly;
  return (
    <>
      <span className="text-4xl font-bold tracking-tight">
        {currency}
        {amount}
      </span>
      <span className="ml-1 text-sm text-muted-foreground">
        <span aria-hidden="true">/</span>
        <span className="sr-only">per </span>
        {period === "monthly" ? "month" : "year"}
      </span>
    </>
  );
}

/** Plan cards for every pricing tier. `renderPrice` lets the motion version swap the price area. */
export function PlanList({
  plans,
  renderPrice,
}: {
  plans: PricingPlan[];
  renderPrice: (plan: PricingPlan) => React.ReactNode;
}) {
  return (
    <ul className={cn("mx-auto mt-10 grid max-w-5xl gap-6", plans.length > 2 ? "lg:grid-cols-3" : "md:grid-cols-2")}>
      {plans.map((plan) => (
        <li
          key={plan.name}
          aria-label={plan.name}
          className={cn("flex flex-col rounded-xl border bg-card p-6 text-left", plan.popular && "border-primary shadow-lg")}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            {plan.popular && <Badge>Most popular</Badge>}
          </div>
          {plan.description && <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>}
          <p className="mt-6">{renderPrice(plan)}</p>
          <ul className="mt-6 flex-1 space-y-2.5 text-sm">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
          {plan.cta.yearlyHref ? (
            // Same CSS switch as the prices: the link matching the checked period shows.
            <>
              <Button asChild variant={plan.popular ? "default" : "outline"} className="mt-8 group-has-[[data-period-input=yearly]:checked]:hidden">
                <a href={plan.cta.href}>{plan.cta.label}</a>
              </Button>
              <Button asChild variant={plan.popular ? "default" : "outline"} className="mt-8 hidden group-has-[[data-period-input=yearly]:checked]:inline-flex">
                <a href={plan.cta.yearlyHref}>{plan.cta.label}</a>
              </Button>
            </>
          ) : (
            <Button asChild variant={plan.popular ? "default" : "outline"} className="mt-8">
              <a href={plan.cta.href}>{plan.cta.label}</a>
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Monthly/yearly radio pair. Plain version: CSS reads the checked radio (no JavaScript). */
export function PeriodSwitch({
  name,
  monthlyLabel,
  yearlyLabel,
  yearlyNote,
  value,
  onChange,
}: {
  name: string;
  monthlyLabel: string;
  yearlyLabel: string;
  yearlyNote?: string;
  value?: "monthly" | "yearly";
  onChange?: (v: "monthly" | "yearly") => void;
}) {
  const option = (period: "monthly" | "yearly", label: string) => (
    <label className="cursor-pointer rounded-md px-3 py-1.5 font-medium text-muted-foreground has-[:checked]:bg-background has-[:checked]:text-foreground has-[:checked]:shadow-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring">
      <input
        type="radio"
        name={name}
        value={period}
        data-period-input={period}
        className="sr-only"
        {...(onChange ? { checked: value === period, onChange: () => onChange(period) } : { defaultChecked: period === "monthly" })}
      />
      {label}
    </label>
  );
  return (
    <fieldset className="mx-auto mt-6 flex w-fit items-center gap-3 text-sm">
      <legend className="sr-only">Billing period</legend>
      <div className="inline-flex rounded-lg bg-muted p-1">
        {option("monthly", monthlyLabel)}
        {option("yearly", yearlyLabel)}
      </div>
      {yearlyNote && <span className="text-muted-foreground">{yearlyNote}</span>}
    </fieldset>
  );
}

/**
 * Pricing tiers with a monthly/yearly switch. The switch is two radios and
 * CSS (`group-has`), so it works without JavaScript.
 */
export function PricingTable({
  title = "Pricing",
  description,
  plans,
  currency = "$",
  monthlyLabel = "Monthly",
  yearlyLabel = "Yearly",
  yearlyNote,
  className,
  ...props
}: PricingTableProps) {
  const name = React.useId();
  return (
    <section className={cn("group mx-auto max-w-6xl px-4 py-16 text-center", className)} {...props}>
      <h2 className="text-3xl font-bold tracking-tight text-balance">{title}</h2>
      {description && <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">{description}</p>}
      {plans.length > 0 && (
        <>
          <PeriodSwitch name={name} monthlyLabel={monthlyLabel} yearlyLabel={yearlyLabel} yearlyNote={yearlyNote} />
          <PlanList
            plans={plans}
            renderPrice={(plan) => (
              <>
                <span data-price data-period="monthly" className="group-has-[[data-period-input=yearly]:checked]:hidden">
                  <PlanPrice plan={plan} period="monthly" currency={currency} />
                </span>
                <span data-price data-period="yearly" className="hidden group-has-[[data-period-input=yearly]:checked]:inline">
                  <PlanPrice plan={plan} period="yearly" currency={currency} />
                </span>
              </>
            )}
          />
        </>
      )}
    </section>
  );
}
