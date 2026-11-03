"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { SpotlightLayers, type HeroSpotlightProps } from "./hero-spotlight";

const EASE = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** HeroSpotlight with motion: the glow follows the pointer across the grid. */
export function HeroSpotlightMotion({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  ...props
}: HeroSpotlightProps) {
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const glow = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef(0);

  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (!animate) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - r.left) / r.width) * 100}%`;
    const y = `${((e.clientY - r.top) / r.height) * 100}%`;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      glow.current?.style.setProperty("--x", x);
      glow.current?.style.setProperty("--y", y);
    });
  };
  const leave = () => {
    glow.current?.style.removeProperty("--x");
    glow.current?.style.removeProperty("--y");
  };
  React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const rise = (delay: number) =>
    animate
      ? { initial: false as const, animate: { opacity: [0.001, 1], y: [14, 0] }, transition: { duration: 0.7, ease: EASE, delay } }
      : {};

  return (
    <section
      className={cn("relative isolate overflow-hidden px-4 py-24 text-center", className)}
      onPointerMove={move}
      onPointerLeave={leave}
      {...props}
    >
      <SpotlightLayers glowRef={glow} />
      <div className="mx-auto max-w-3xl">
        {eyebrow && (
          <motion.div className="inline-block" {...rise(0)}>
            <Badge variant="secondary">{eyebrow}</Badge>
          </motion.div>
        )}
        <motion.h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-6xl" {...rise(0.05)}>
          {title}
        </motion.h1>
        {description && (
          <motion.p className="mt-5 text-lg text-pretty text-muted-foreground" {...rise(0.15)}>
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
      </div>
    </section>
  );
}
