"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { initials, type TeamProps } from "./team";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * Team with motion: people rise in one after another as the grid scrolls into view.
 * One tree from server to client: motion switches on after mount, so hydration keeps the server's DOM.
 */
export function TeamMotion({ title, description, people, className, ...props }: TeamProps) {
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...props}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      {people.length > 0 && (
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p, i) => (
            <motion.li
              key={p.name}
              className="text-center"
              whileInView={on ? { opacity: [0.001, 1], y: [16, 0] } : undefined}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
            >
              {p.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the section framework-agnostic
                <img src={p.avatar} alt="" className="mx-auto size-24 rounded-full object-cover" />
              ) : (
                <span aria-hidden="true" className="mx-auto grid size-24 place-items-center rounded-full bg-muted text-xl font-semibold">
                  {initials(p.name)}
                </span>
              )}
              <h3 className="mt-4 font-semibold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.role}</p>
              {p.bio && <p className="mt-2 text-sm text-pretty text-muted-foreground">{p.bio}</p>}
              {p.links && p.links.length > 0 && (
                <ul className="mt-3 flex justify-center gap-3 text-sm">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} aria-label={`${p.name} on ${l.label}`} className="text-primary underline-offset-4 hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}
