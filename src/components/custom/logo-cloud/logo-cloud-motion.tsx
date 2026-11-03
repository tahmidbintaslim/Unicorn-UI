"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { LogoCloud, type LogoCloudProps } from "./logo-cloud";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** LogoCloud with motion: names fade in one after another as the strip scrolls into view. */
export function LogoCloudMotion(props: LogoCloudProps) {
  const { title = "Trusted by teams at", logos, className, ...rest } = props;
  const reduced = useReducedMotion();
  if (!useMounted() || reduced || logos.length === 0) return <LogoCloud {...props} />;
  return (
    <section className={cn("mx-auto max-w-4xl px-4 py-12 text-center", className)} {...rest}>
      <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{title}</h2>
      <motion.ul
        className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        initial="out"
        whileInView="in"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.06 }}
      >
        {logos.map(({ name, logo }) => (
          <motion.li
            key={name}
            className="text-lg font-semibold text-muted-foreground"
            variants={{ out: { opacity: 0.001, y: 8, filter: "blur(4px)" }, in: { opacity: 1, y: 0, filter: "blur(0px)" } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {logo ? (
              <>
                <span aria-hidden="true">{logo}</span>
                <span className="sr-only">{name}</span>
              </>
            ) : (
              name
            )}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
