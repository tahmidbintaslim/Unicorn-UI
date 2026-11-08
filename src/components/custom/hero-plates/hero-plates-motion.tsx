"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import React from "react";
import { HeroPlatesCopy, plateClass, type HeroPlatesProps, type Plate } from "./hero-plates";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

function PlateItem({ plate, index, count, progress }: { plate: Plate; index: number; count: number; progress: MotionValue<number> }) {
  // Each plate lands a little after the one above it.
  const start = (index / count) * 0.35;
  const end = start + 0.3;
  const from = index % 2 ? 80 : -80;
  const x = useTransform(progress, [start, end], [from, 0], { clamp: true });
  const rotate = useTransform(progress, [start, end], [index % 2 ? 4 : -4, 0], { clamp: true });
  const opacity = useTransform(progress, [start, end], [0.35, 1], { clamp: true });
  return (
    <motion.li style={{ x, rotate, opacity }} className={cn(plateClass, index % 2 ? "ml-6" : "mr-6")}>
      {plate.label}
      {plate.content}
    </motion.li>
  );
}

/**
 * HeroPlates with motion: as the section scrolls into view, the plates slide
 * in from alternating sides and settle into a page. Reduced motion gets the
 * plain stack.
 */
export function HeroPlatesMotion(props: HeroPlatesProps) {
  const { plates, className, ...rest } = props;
  // The section always renders with its ref so useScroll has a hydrated target.
  const { eyebrow, title, titleAs, description, primaryAction, secondaryAction, ...sectionProps } = rest;
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const target = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "center center"] });

  return (
    <section
      ref={target}
      className={cn("mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2", className)}
      {...sectionProps}
    >
      <HeroPlatesCopy {...{ eyebrow, title, description, primaryAction, secondaryAction, titleAs }} />
      <ul className="mx-auto flex w-full max-w-md flex-col gap-3">
        {plates.map((plate, i) =>
          animate ? (
            <PlateItem key={plate.label} plate={plate} index={i} count={plates.length} progress={scrollYProgress} />
          ) : (
            <li key={plate.label} className={cn(plateClass, i % 2 ? "ml-6" : "mr-6")}>
              {plate.label}
              {plate.content}
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
