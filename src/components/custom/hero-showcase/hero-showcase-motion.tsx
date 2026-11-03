"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import type { HeroShowcaseProps } from "./hero-showcase";

const EASE = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** HeroShowcase with motion: the frame rises and settles, and lifts on hover. */
export function HeroShowcaseMotion({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  className,
  ...props
}: HeroShowcaseProps) {
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const rise = (delay: number) =>
    animate
      ? { initial: false as const, animate: { opacity: [0.001, 1], y: [14, 0] }, transition: { duration: 0.7, ease: EASE, delay } }
      : {};

  return (
    <section className={cn("mx-auto max-w-5xl px-4 py-16 text-center", className)} {...props}>
      {eyebrow && (
        <motion.div className="inline-block" {...rise(0)}>
          <Badge variant="secondary">{eyebrow}</Badge>
        </motion.div>
      )}
      <motion.h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl" {...rise(0.05)}>
        {title}
      </motion.h1>
      {description && (
        <motion.p className="mx-auto mt-4 max-w-2xl text-lg text-pretty text-muted-foreground" {...rise(0.15)}>
          {description}
        </motion.p>
      )}
      {(primaryAction || secondaryAction) && (
        <motion.div className="mt-8 flex flex-wrap justify-center gap-3" {...rise(0.25)}>
          {primaryAction && (
            <Button asChild size="lg">
              <a href={primaryAction.href}>{primaryAction.label}</a>
            </Button>
          )}
          {secondaryAction && (
            <Button asChild size="lg" variant="outline">
              <a href={secondaryAction.href}>{secondaryAction.label}</a>
            </Button>
          )}
        </motion.div>
      )}
      <motion.div
        data-slot="showcase-frame"
        className="mt-12 rounded-2xl border bg-card p-2 text-left shadow-xl sm:p-3"
        {...(animate
          ? {
              initial: false as const,
              animate: { opacity: [0.001, 1], y: [32, 0], scale: [0.96, 1] },
              transition: { duration: 0.9, ease: EASE, delay: 0.3 },
              whileHover: { y: -4, transition: { duration: 0.3, ease: EASE } },
            }
          : {})}
      >
        {children}
      </motion.div>
    </section>
  );
}
