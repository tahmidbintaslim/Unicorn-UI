"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React from "react";
import type { HeroWaitlistProps } from "./hero-waitlist";

const EASE = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

export interface HeroWaitlistMotionProps extends Omit<HeroWaitlistProps, "onSubmit"> {
  /** Handle the signup yourself. Without it the form posts to `action` like the plain version. */
  onSubmit?: (email: string) => Promise<void>;
}

type Status = "idle" | "sending" | "done" | "error";

/**
 * HeroWaitlist with motion: the field glows on focus and, with `onSubmit`,
 * the button morphs into "Sending…" and then the success message.
 */
export function HeroWaitlistMotion({
  eyebrow,
  title,
  description,
  action,
  method = "post",
  inputLabel = "Email address",
  buttonLabel = "Join the waitlist",
  note,
  onSubmit,
  className,
  ...props
}: HeroWaitlistMotionProps) {
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const id = React.useId();
  const [status, setStatus] = React.useState<Status>("idle");
  const rise = (delay: number) =>
    animate
      ? { initial: false as const, animate: { opacity: [0.001, 1], y: [14, 0] }, transition: { duration: 0.7, ease: EASE, delay } }
      : {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!onSubmit) return;
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    setStatus("sending");
    try {
      await onSubmit(email);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={cn("mx-auto max-w-2xl px-4 py-16 text-center", className)} {...props}>
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
      <motion.div className="mx-auto mt-8 max-w-md" {...rise(0.25)}>
        <AnimatePresence mode="wait" initial={false}>
          {status === "done" ? (
            <motion.p
              key="done"
              role="status"
              className="rounded-md border bg-muted/50 px-4 py-2.5 text-sm font-medium"
              {...(animate ? { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, ease: EASE } } : {})}
            >
              You&apos;re on the list.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              action={action}
              method={method}
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 sm:flex-row"
              {...(animate ? { exit: { opacity: 0, scale: 0.98 }, transition: { duration: 0.2 } } : {})}
            >
              <label htmlFor={id} className="sr-only">
                {inputLabel}
              </label>
              <input
                id={id}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                disabled={status === "sending"}
                className="placeholder:text-muted-foreground h-10 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm shadow-xs outline-none transition-shadow focus-visible:border-ring focus-visible:shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_25%,transparent)]"
              />
              <Button type="submit" size="lg" disabled={status === "sending"} asChild={false}>
                <motion.span layout={animate} className="inline-block">
                  {status === "sending" ? "Sending…" : buttonLabel}
                </motion.span>
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
        {status === "error" && (
          <p role="alert" className="mt-2 text-sm text-destructive">
            Something went wrong. Try again.
          </p>
        )}
      </motion.div>
      {note && <p className="mt-3 text-sm text-muted-foreground">{note}</p>}
    </section>
  );
}
