"use client";

import { useReducedMotion } from "motion/react";
import React from "react";

/**
 * Dark grid canvas for the landing hero with a glow that follows the pointer.
 * Static glow with reduced motion. Decorative layers only; children sit on top.
 */
export function HeroCanvas({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const glow = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef(0);
  React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = `${e.clientX - r.left}px`;
    const y = `${e.clientY - r.top}px`;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      glow.current?.style.setProperty("--x", x);
      glow.current?.style.setProperty("--y", y);
    });
  };

  return (
    <div className="relative isolate overflow-hidden" onPointerMove={move}>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)] bg-[linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_7%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_7%,transparent)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 mx-auto h-[36rem] max-w-5xl rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand)_22%,transparent),transparent)]"
      />
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,-200px),color-mix(in_oklch,var(--brand)_14%,transparent),transparent_70%)]"
      />
      {children}
    </div>
  );
}
