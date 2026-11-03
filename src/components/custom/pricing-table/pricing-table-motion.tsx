"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React from "react";
import { PeriodSwitch, PlanList, PlanPrice, PricingTable, type PricingTableProps } from "./pricing-table";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * PricingTable with motion: switching the period rolls each price to its
 * new value. Server HTML and reduced motion get the plain CSS-only table.
 */
export function PricingTableMotion(props: PricingTableProps) {
  const {
    title = "Pricing",
    description,
    plans,
    currency = "$",
    monthlyLabel = "Monthly",
    yearlyLabel = "Yearly",
    yearlyNote,
    className,
    ...rest
  } = props;
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const name = React.useId();
  const [period, setPeriod] = React.useState<"monthly" | "yearly">("monthly");

  if (!animate || plans.length === 0) return <PricingTable {...props} />;

  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16 text-center", className)} {...rest}>
      <h2 className="text-3xl font-bold tracking-tight text-balance">{title}</h2>
      {description && <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">{description}</p>}
      <PeriodSwitch
        name={name}
        monthlyLabel={monthlyLabel}
        yearlyLabel={yearlyLabel}
        yearlyNote={yearlyNote}
        value={period}
        onChange={setPeriod}
      />
      <PlanList
        plans={plans}
        renderPrice={(plan) => (
          <span className="relative inline-flex overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={period}
                initial={{ y: "60%", opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-60%", opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <PlanPrice plan={plan} period={period} currency={currency} />
              </motion.span>
            </AnimatePresence>
          </span>
        )}
      />
    </section>
  );
}
