"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useReducedMotionPref } from "./use-reduced-motion";

/**
 * Site-only scroll entrance: content fades and rises 16px once it scrolls
 * into view. Visible before hydration and static with reduced motion.
 * CSS transitions plus one IntersectionObserver, so it adds no animation
 * library to the landing page.
 */
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotionPref();
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  const animate = reduced === false;

  React.useEffect(() => {
    const el = ref.current;
    if (!animate || !el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  if (!animate) return <div className={className}>{children}</div>;
  return (
    <div
      ref={ref}
      data-reveal={inView ? "in" : "out"}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        "transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] data-[reveal=out]:translate-y-4 data-[reveal=out]:opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
