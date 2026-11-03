"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React from "react";
import { inputClass, type NewsletterProps } from "./newsletter";

export interface NewsletterMotionProps extends Omit<NewsletterProps, "onSubmit"> {
  /** Handle the signup yourself; without it the form posts to `action`. */
  onSubmit?: (email: string) => Promise<void>;
  successMessage?: string;
}

/**
 * Newsletter with motion: with `onSubmit`, the form morphs into the
 * success message. A live region announces the result.
 */
export function NewsletterMotion({
  title,
  description,
  action,
  method = "post",
  inputLabel = "Email address",
  buttonLabel = "Subscribe",
  note,
  onSubmit,
  successMessage = "Thanks, you're subscribed.",
  className,
  ...props
}: NewsletterMotionProps) {
  const reduced = useReducedMotion();
  const id = React.useId();
  const [status, setStatus] = React.useState<"idle" | "sending" | "done" | "error">("idle");
  const fade = reduced ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.3 } };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!onSubmit) return;
    e.preventDefault();
    setStatus("sending");
    try {
      await onSubmit(String(new FormData(e.currentTarget).get("email") ?? ""));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={cn("mx-auto max-w-5xl px-4 py-16", className)} {...props}>
      <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && <p className="mt-2 text-muted-foreground">{description}</p>}
        </div>
        <div className="w-full md:max-w-sm">
          {/* Always mounted, so screen readers hear the result when it changes. */}
          <p role="status" className="sr-only">
            {status === "done" ? successMessage : status === "error" ? "Something went wrong. Try again." : ""}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            {status === "done" ? (
              <motion.p key="done" aria-hidden="true" className="rounded-md border bg-muted/50 px-4 py-2.5 text-sm font-medium" {...fade}>
                {successMessage}
              </motion.p>
            ) : (
              <motion.form key="form" action={action} method={method} onSubmit={submit} className="flex flex-col gap-2 sm:flex-row" {...fade}>
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
                  className={inputClass}
                />
                <Button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : buttonLabel}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
          {status === "error" && (
            <p aria-hidden="true" className="mt-2 text-sm text-destructive">
              Something went wrong. Try again.
            </p>
          )}
          {note && <p className="mt-2 text-xs text-muted-foreground">{note}</p>}
        </div>
      </div>
    </section>
  );
}
