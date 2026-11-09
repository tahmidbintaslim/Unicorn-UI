"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { formatLaunchDate, type ComingSoonProps } from "./coming-soon";

const EASE = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * ComingSoon with motion: badge, title, copy and the notify form rise in one after another, ending on the form.
 * One tree from server to client: motion switches on after mount, so hydration keeps the server's DOM.
 */
export function ComingSoonMotion({
  titleAs,
  title,
  description,
  action,
  launchDate,
  badge = "Coming soon",
  buttonLabel = "Notify me",
  className,
  ...props
}: ComingSoonProps) {
  const Title = titleAs === "h2" ? motion.h2 : motion.h1;
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  const id = React.useId();
  const rise = (delay: number) =>
    on ? { initial: false as const, animate: { opacity: [0.001, 1], y: [14, 0] }, transition: { duration: 0.7, ease: EASE, delay } } : {};
  return (
    <section className={cn("mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center", className)} {...props}>
      <motion.div {...rise(0)}>
        <Badge variant="secondary">{badge}</Badge>
      </motion.div>
      <Title className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl" {...rise(0.08)}>
        {title}
      </Title>
      {description && (
        <motion.p className="mt-4 text-lg text-pretty text-muted-foreground" {...rise(0.16)}>
          {description}
        </motion.p>
      )}
      {launchDate && (
        <motion.p className="mt-4 text-sm font-medium" {...rise(0.22)}>
          Launching <time dateTime={launchDate}>{formatLaunchDate(launchDate)}</time>
        </motion.p>
      )}
      <motion.form action={action} method="post" className="mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row" {...rise(0.3)}>
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="placeholder:text-muted-foreground h-11 min-w-0 rounded-md border bg-background px-3 text-base shadow-xs sm:h-10 sm:flex-1 sm:text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
        <Button type="submit" size="lg">
          {buttonLabel}
        </Button>
      </motion.form>
    </section>
  );
}
