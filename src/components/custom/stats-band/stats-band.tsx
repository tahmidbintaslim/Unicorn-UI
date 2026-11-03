import { cn } from "@/lib/utils";
import React from "react";

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  /** Digits after the decimal point */
  decimals?: number;
}

export interface StatsBandProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  stats: Stat[];
}

/** Formats a stat the same way on the server and in the browser. */
export function formatStat(stat: Stat, value = stat.value) {
  const d = stat.decimals ?? 0;
  return `${stat.prefix ?? ""}${value.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })}${stat.suffix ?? ""}`;
}

/** A band of 2–4 big numbers with labels. */
export function StatsBand({ title, description, stats, className, ...props }: StatsBandProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...props}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      {stats.length > 0 && (
        <dl className={cn("mt-10 grid gap-8 text-center sm:grid-cols-2", stats.length > 2 && "lg:grid-cols-4")}>
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="text-4xl font-bold tracking-tight tabular-nums">{formatStat(stat)}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
