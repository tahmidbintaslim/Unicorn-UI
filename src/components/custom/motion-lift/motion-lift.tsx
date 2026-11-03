"use client";

import { cn } from "@/lib/utils";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import React from "react";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * Client island for the card motion versions: lifts its child on hover with a
 * spring, and counts up any `[data-stat-value]` number inside it once it
 * scrolls into view. The card itself stays a server component, so props like
 * lucide icons never cross the server/client boundary.
 */
export function MotionLift({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  React.useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>("[data-stat-value]");
    if (!on || !inView || !el) return;
    const final = el.textContent;
    const controls = animate(0, Number(el.dataset.statValue), {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = Math.round(v).toLocaleString("en-US")),
      onComplete: () => (el.textContent = final),
    });
    return () => {
      controls.stop();
      el.textContent = final;
    };
  }, [on, inView]);

  return (
    <motion.div
      ref={ref}
      data-motion-lift={on ? "on" : "off"}
      className={cn("h-full", className)}
      whileHover={on ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}
