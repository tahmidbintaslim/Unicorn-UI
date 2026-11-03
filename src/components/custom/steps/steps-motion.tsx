"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import React from "react";
import { StepItem, type StepsProps } from "./steps";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** Steps with motion: the connecting line draws across as you scroll the steps into view. */
export function StepsMotion({ title, description, steps, className, ...props }: StepsProps) {
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const target = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target, offset: ["start 85%", "center 55%"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...props}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      {steps.length > 0 && (
        <div ref={target} className="relative mt-12">
          <span aria-hidden="true" className="absolute top-5 right-[12%] left-[12%] hidden h-px bg-border md:block" />
          {animate && (
            <motion.span
              aria-hidden="true"
              style={{ scaleX }}
              className="absolute top-5 right-[12%] left-[12%] hidden h-0.5 origin-left bg-primary md:block"
            />
          )}
          <ol className="relative grid gap-10 md:auto-cols-fr md:grid-flow-col">
            {steps.map((step, i) => (
              <li key={step.title} className="text-center">
                <span className="sr-only">Step {i + 1}: </span>
                <StepItem step={step} index={i} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
