"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { FeatureGrid, GridFeatureItem, gridCols, type FeatureGridProps } from "./feature-grid";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** FeatureGrid with motion: features rise in one after another as the grid scrolls into view. */
export function FeatureGridMotion(props: FeatureGridProps) {
  const { title, description, items, columns = 3, className, ...rest } = props;
  const reduced = useReducedMotion();
  if (!useMounted() || reduced || items.length === 0) return <FeatureGrid {...props} />;
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...rest}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      <motion.ul
        className={cn("mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2", gridCols[columns])}
        initial="out"
        whileInView="in"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.07 }}
      >
        {items.map((item) => (
          <motion.li
            key={item.title}
            variants={{ out: { opacity: 0.001, y: 16 }, in: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <GridFeatureItem item={item} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
