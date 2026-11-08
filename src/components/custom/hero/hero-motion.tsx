"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import type { HeroProps } from "./hero";

const EASE = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};

/** False on the server and during hydration, true once mounted in the browser. */
function useMounted() {
  return React.useSyncExternalStore(noop, () => true, () => false);
}

/**
 * Hero with an entrance: the title's words rise in one after another, then the
 * description and buttons follow. Same props as `Hero`. Server HTML and
 * reduced-motion visitors get the static layout, with nothing hidden.
 */
export function HeroMotion({ titleAs: TitleTag = "h1",
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  ...props
}: HeroProps) {
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const words = title.split(" ");
  const rise = (delay: number) =>
    animate
      ? {
          initial: false as const,
          animate: { opacity: [0.001, 1], y: [14, 0] },
          transition: { duration: 0.7, ease: EASE, delay },
        }
      : {};
  const after = words.length * 0.04 + 0.1;

  return (
    <section className={cn("mx-auto max-w-3xl px-4 py-16 text-center", className)} {...props}>
      {eyebrow && (
        <motion.div className="inline-block" {...rise(0)}>
          <Badge variant="secondary">{eyebrow}</Badge>
        </motion.div>
      )}
      <TitleTag className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {words.map((word, i) => (
          <React.Fragment key={i}>
            {i > 0 && " "}
            <motion.span className="inline-block" {...rise(0.05 + i * 0.04)}>
              {word}
            </motion.span>
          </React.Fragment>
        ))}
      </TitleTag>
      {description && (
        <motion.p className="mt-4 text-lg text-muted-foreground" {...rise(after)}>
          {description}
        </motion.p>
      )}
      {(primaryAction || secondaryAction) && (
        <motion.div className="mt-8 flex flex-wrap justify-center gap-3" {...rise(after + 0.1)}>
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
    </section>
  );
}
