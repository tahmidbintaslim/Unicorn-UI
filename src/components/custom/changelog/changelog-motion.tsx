"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { formatDate, type ChangelogProps } from "./changelog";

const EASE = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * Changelog with motion: each release rises in as it scrolls into view and its dot on the rail pops in,
 * so the timeline reads top to bottom. One tree from server to client: motion switches on after mount.
 */
export function ChangelogMotion({ title = "Changelog", entries, className, ...props }: ChangelogProps) {
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  return (
    <section className={cn("mx-auto max-w-3xl px-4 py-16", className)} {...props}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <ol className="mt-10 space-y-12 border-l pl-6">
        {entries.map((e) => (
          <motion.li
            key={e.date + e.title}
            className="relative"
            whileInView={on ? { opacity: [0.001, 1], y: [16, 0] } : undefined}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <motion.span
              aria-hidden="true"
              className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-primary"
              whileInView={on ? { scale: [0.3, 1.3, 1] } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
            />
            <article>
              <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={e.date}>{formatDate(e.date)}</time>
                {e.version && <Badge variant="secondary">v{e.version}</Badge>}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{e.title}</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
                {e.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
