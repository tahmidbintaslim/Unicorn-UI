"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { PLATES, Plate } from "../_site/brand-mark";

const noop = () => () => {};
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * The logo, large, for the hero: the three plates are served one after another,
 * landing with a small bounce. Same SVG on the server; motion starts after mount.
 */
export function HeroMark() {
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  return (
    <svg viewBox="-2 -2 28 28" aria-hidden="true" className="mx-auto size-20 overflow-visible drop-shadow-[0_10px_30px_color-mix(in_oklch,var(--saffron)_35%,transparent)] sm:size-24">
      {PLATES.map((p, i) => (
        <motion.g
          key={p.color}
          style={{ originX: `${p.cx}px`, originY: `${p.cy}px` }}
          animate={on ? { opacity: [0.001, 1], y: [-14, 0], scale: [0.6, 1.08, 1], rotate: [-25, 0] } : undefined}
          transition={{ duration: 0.7, delay: 0.15 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          <Plate {...p} />
        </motion.g>
      ))}
    </svg>
  );
}
