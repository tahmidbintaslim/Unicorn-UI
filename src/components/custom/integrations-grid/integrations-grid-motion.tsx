"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { IntegrationTile, tileClass, type IntegrationsGridProps } from "./integrations-grid";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** IntegrationsGrid with motion: tiles lift and glow in your primary color on hover and focus. */
export function IntegrationsGridMotion(props: IntegrationsGridProps) {
  const { title, description, items, className, ...rest } = props;
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  const lift = on
    ? {
        whileHover: { y: -3, boxShadow: "0 12px 32px -12px color-mix(in oklch, var(--primary) 45%, transparent)" },
        whileFocus: { y: -3 },
        transition: { type: "spring" as const, stiffness: 400, damping: 25 },
      }
    : {};
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...rest}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      {items.length > 0 && (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.name}>
              {item.href ? (
                <motion.a href={item.href} className={tileClass} {...lift}>
                  <IntegrationTile item={item} />
                </motion.a>
              ) : (
                <motion.div className={tileClass} {...lift}>
                  <IntegrationTile item={item} />
                </motion.div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
