"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { FeatureRows, RowCopy, type FeatureRowsProps } from "./feature-rows";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** FeatureRows with motion: each row's media slides in from its own side as it scrolls into view. */
export function FeatureRowsMotion(props: FeatureRowsProps) {
  const { title, description, rows, className, ...rest } = props;
  const reduced = useReducedMotion();
  if (!useMounted() || reduced) return <FeatureRows {...props} />;
  return (
    <section className={cn("mx-auto max-w-6xl overflow-x-clip px-4 py-16", className)} {...rest}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      <div className="mt-12 space-y-20">
        {rows.map((row, i) => (
          <div key={row.title} className="grid items-center gap-10 lg:grid-cols-2">
            <RowCopy row={row} />
            <motion.div
              data-slot="row-media"
              className={cn("min-w-0", i % 2 === 1 && "lg:order-first")}
              initial={{ opacity: 0.001, x: i % 2 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {row.media}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
