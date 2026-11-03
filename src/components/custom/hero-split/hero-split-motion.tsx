"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import React from "react";
import type { HeroSplitProps } from "./hero-split";

const EASE = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * HeroSplit with motion: the copy rises in, the media floats up and tilts
 * slightly toward a mouse pointer (never on touch). Same props as HeroSplit.
 */
export function HeroSplitMotion({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  media,
  mediaPosition = "right",
  className,
  ...props
}: HeroSplitProps) {
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });

  const rise = (delay: number, y = 14) =>
    animate
      ? { initial: false as const, animate: { opacity: [0.001, 1], y: [y, 0] }, transition: { duration: 0.7, ease: EASE, delay } }
      : {};

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!animate || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      className={cn("mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2", className)}
      {...props}
    >
      <div className={cn("text-center lg:text-left", mediaPosition === "left" && "lg:order-2")}>
        {eyebrow && (
          <motion.div className="inline-block" {...rise(0)}>
            <Badge variant="secondary">{eyebrow}</Badge>
          </motion.div>
        )}
        <motion.h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl" {...rise(0.05)}>
          {title}
        </motion.h1>
        {description && (
          <motion.p className="mt-4 text-lg text-pretty text-muted-foreground" {...rise(0.15)}>
            {description}
          </motion.p>
        )}
        {(primaryAction || secondaryAction) && (
          <motion.div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start" {...rise(0.25)}>
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
      <div
        data-slot="hero-media"
        className={cn("min-w-0 [perspective:1200px]", mediaPosition === "left" && "lg:order-1")}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
      >
        <motion.div style={animate ? { rotateX, rotateY } : undefined} {...rise(0.2, 24)}>
          {media}
        </motion.div>
      </div>
    </section>
  );
}
