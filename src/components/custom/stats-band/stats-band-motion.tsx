"use client";

import { cn } from "@/lib/utils";
import { animate, useInView, useReducedMotion } from "motion/react";
import React from "react";
import { StatsBand, formatStat, type Stat, type StatsBandProps } from "./stats-band";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** Counts from 0 to the stat once it scrolls into view. Final value is the server text. */
function CountUp({ stat }: { stat: Stat }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  // Latest stat for formatting; the effect keys on its contents, so a parent
  // re-rendering with an equal but fresh object doesn't restart the count.
  const latest = React.useRef(stat);
  latest.current = stat;
  const key = formatStat(stat);
  React.useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, latest.current.value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = formatStat(latest.current, v)),
    });
    return () => controls.stop();
  }, [inView, key]);
  return (
    <>
      <span className="sr-only">{formatStat(stat)}</span>
      <span ref={ref} aria-hidden="true">
        {formatStat(stat)}
      </span>
    </>
  );
}

/** StatsBand with motion: each number counts up once when the band scrolls into view. */
export function StatsBandMotion(props: StatsBandProps) {
  const { title, description, stats, className, ...rest } = props;
  const reduced = useReducedMotion();
  if (!useMounted() || reduced || stats.length === 0) return <StatsBand {...props} />;
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...rest}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      <dl className={cn("mt-10 grid gap-8 text-center sm:grid-cols-2", stats.length > 2 && "lg:grid-cols-4")}>
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-1">
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="text-4xl font-bold tracking-tight tabular-nums">
              <CountUp stat={stat} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
