"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { ComparisonCell, type ComparisonTableProps } from "./comparison-table";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * ComparisonTable with motion: rows fade in top to bottom as the table scrolls into view, so it reads feature by feature.
 * Opacity only: transforms on table rows are unreliable across browsers.
 * One tree from server to client: motion switches on after mount, so hydration keeps the server's DOM.
 */
export function ComparisonTableMotion({
  title,
  description,
  caption,
  plans,
  rows,
  featureLabel = "Feature",
  className,
  ...props
}: ComparisonTableProps) {
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  return (
    <section className={cn("mx-auto max-w-5xl px-4 py-16", className)} {...props}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      <div
        role="region"
        aria-label={caption}
        tabIndex={0}
        className="relative mt-10 overflow-x-auto rounded-xl border focus-visible:outline-2 focus-visible:outline-ring"
      >
        <table className="w-full min-w-[32rem] text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-muted/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                {featureLabel}
              </th>
              {plans.map((plan) => (
                <th key={plan} scope="col" className="px-4 py-3 text-center font-semibold">
                  {plan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row, r) => (
              <motion.tr
                key={row.feature}
                whileInView={on ? { opacity: [0.001, 1] } : undefined}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(r, 10) * 0.06 }}
              >
                <th scope="row" className="px-4 py-3 text-left font-normal">
                  {row.feature}
                </th>
                {row.values.map((value, i) => (
                  <td key={i} className="px-4 py-3 text-center text-muted-foreground">
                    <ComparisonCell value={value} />
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
