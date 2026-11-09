"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { CopyButton } from "./copy-button";
import type { HeroCommandProps } from "./hero-command";

const EASE = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** Types `text` one character every `ms` once `run` is true; returns the visible part. */
function useTyped(text: string, run: boolean, ms = 30) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!run) return;
    setCount(0);
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, ms);
    return () => window.clearInterval(id);
  }, [text, run, ms]);
  return run ? text.slice(0, count) : text;
}

/**
 * HeroCommand with motion: the command types itself with a blinking caret.
 * The full command is always in the page for screen readers and copying.
 */
export function HeroCommandMotion({
  eyebrow,
  title,
  titleAs,
  description,
  primaryAction,
  command,
  copyLabel = "Copy command",
  className,
  ...props
}: HeroCommandProps) {
  const Title = titleAs === "h2" ? motion.h2 : motion.h1;
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const typed = useTyped(command, animate);
  const done = typed.length === command.length;
  const rise = (delay: number) =>
    animate
      ? { initial: false as const, animate: { opacity: [0.001, 1], y: [14, 0] }, transition: { duration: 0.7, ease: EASE, delay } }
      : {};

  return (
    <section className={cn("mx-auto max-w-3xl px-4 py-16 text-center", className)} {...props}>
      {eyebrow && (
        <motion.div className="inline-block" {...rise(0)}>
          <Badge variant="secondary">{eyebrow}</Badge>
        </motion.div>
      )}
      <Title className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl" {...rise(0.05)}>
        {title}
      </Title>
      {description && (
        <motion.p className="mt-4 text-lg text-pretty text-muted-foreground" {...rise(0.15)}>
          {description}
        </motion.p>
      )}
      <motion.div
        className="mx-auto mt-8 flex max-w-full items-center gap-2 rounded-xl border bg-muted/50 py-2 pr-2 pl-4 text-left font-mono text-sm sm:w-fit"
        {...rise(0.25)}
      >
        <span aria-hidden="true" className="text-muted-foreground">
          $
        </span>
        <code className="relative min-w-0 flex-1 overflow-x-auto whitespace-nowrap">
          <span className="sr-only">{command}</span>
          {/* Holds the full width and stays readable (dimmed) while typing, so the command never vanishes. */}
          <span aria-hidden="true" className={animate && !done ? "text-muted-foreground/40" : "invisible"}>
            {command}
          </span>
          <span aria-hidden="true" className="absolute inset-0">
            {typed}
            {animate && !done && <span className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-foreground/70" />}
          </span>
        </code>
        <CopyButton text={command} label={copyLabel} />
      </motion.div>
      {primaryAction && (
        <motion.div className="mt-6" {...rise(0.35)}>
          <Button asChild variant="link">
            <a href={primaryAction.href}>{primaryAction.label}</a>
          </Button>
        </motion.div>
      )}
    </section>
  );
}
