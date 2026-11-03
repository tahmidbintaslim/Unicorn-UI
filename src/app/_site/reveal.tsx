"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

const noop = () => () => {};
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * Site-only scroll entrance: content fades and rises 16px once it scrolls
 * into view. Visible before hydration and static with reduced motion.
 */
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  if (!animate) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.001, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
