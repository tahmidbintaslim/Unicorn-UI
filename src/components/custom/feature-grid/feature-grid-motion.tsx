"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { GridFeatureItem, gridCols, type FeatureGridProps } from "./feature-grid";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * FeatureGrid with motion: features rise in one after another as the grid scrolls into view.
 * One tree from server to client: motion switches on after mount, so hydration keeps the
 * server's DOM (and any focus) instead of swapping in a new tree.
 */
export function FeatureGridMotion(props: FeatureGridProps) {
  const { title, description, items, columns = 3, className, ...rest } = props;
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...rest}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      {items.length > 0 && (
        <ul className={cn("mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2", gridCols[columns])}>
          {items.map((item, i) => (
            <motion.li
              key={item.title}
              whileInView={on ? { opacity: [0.001, 1], y: [16, 0] } : undefined}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
            >
              <GridFeatureItem item={item} />
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}
