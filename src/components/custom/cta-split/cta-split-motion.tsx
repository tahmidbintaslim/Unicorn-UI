"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { CtaSplitCopy, type CtaSplitProps } from "./cta-split";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** CtaSplit with motion: the media floats up into place when the band scrolls into view. */
export function CtaSplitMotion({ media, className, ...props }: CtaSplitProps) {
  const { title, description, primaryAction, secondaryAction, ...rest } = props;
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...rest}>
      <div className="grid items-center gap-10 overflow-hidden rounded-2xl border bg-muted/40 p-8 sm:p-12 lg:grid-cols-2">
        <CtaSplitCopy {...{ title, description, primaryAction, secondaryAction }} />
        {/* Keyed so it remounts once motion is on: motion reads `initial` only at mount. */}
        <motion.div
          key={animate ? "motion" : "static"}
          className="min-w-0"
          {...(animate
            ? {
                initial: { opacity: 0.001, y: 32, rotate: -2 },
                whileInView: { opacity: 1, y: 0, rotate: 0 },
                viewport: { once: true, amount: 0.4 },
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              }
            : {})}
        >
          {media}
        </motion.div>
      </div>
    </section>
  );
}
