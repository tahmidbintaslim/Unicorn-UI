"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { CtaBanner, type CtaBannerProps } from "./cta-banner";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** CtaBanner with motion: a light sheen sweeps across the band on hover or keyboard focus, once per visit. */
export function CtaBannerMotion(props: CtaBannerProps) {
  const { title, description, actionLabel, actionHref, className, ...rest } = props;
  const reduced = useReducedMotion();
  if (!useMounted() || reduced) return <CtaBanner {...props} />;
  return (
    <motion.section
      className={cn(
        "relative flex flex-col items-center gap-4 overflow-hidden rounded-xl bg-primary px-6 py-12 text-center text-primary-foreground",
        className,
      )}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      {...(rest as React.ComponentProps<typeof motion.section>)}
    >
      {/* Decorative sheen: a soft diagonal highlight parked off the left edge. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-primary-foreground/15 to-transparent"
        variants={{ rest: { x: "0%" }, hover: { x: "400%" } }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <h2 className="relative text-3xl font-bold">{title}</h2>
      {description && <p className="relative max-w-xl opacity-90">{description}</p>}
      <Button asChild variant="secondary" size="lg" className="relative">
        <a href={actionHref}>{actionLabel}</a>
      </Button>
    </motion.section>
  );
}
