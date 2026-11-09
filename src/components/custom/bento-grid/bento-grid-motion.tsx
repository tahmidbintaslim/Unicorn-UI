"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { BentoTileBody, bentoSizeClass, bentoTileClass, type BentoGridProps } from "./bento-grid";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** BentoGrid with motion: tiles rise in one after another, then lift on hover. */
export function BentoGridMotion(props: BentoGridProps) {
  const { title, items, className, ...rest } = props;
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-12", className)} {...rest}>
      {title && <h2 className="mb-8 text-center text-3xl font-bold">{title}</h2>}
      <ul className="grid auto-rows-[minmax(10rem,auto)] grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <motion.li
            key={item.title}
            className={cn(bentoTileClass, bentoSizeClass[item.size ?? "default"], on && "transition-shadow hover:shadow-md")}
            whileInView={on ? { opacity: [0.001, 1], y: [20, 0] } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            whileHover={on ? { y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } } : undefined}
          >
            <BentoTileBody item={item} />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
