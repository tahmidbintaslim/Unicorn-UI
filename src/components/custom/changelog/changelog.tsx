import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

export interface ChangelogEntry {
  /** ISO date, such as "2026-11-03" */
  date: string;
  title: string;
  version?: string;
  items: string[];
}

export interface ChangelogProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  entries: ChangelogEntry[];
}

/** Formats an ISO date in UTC and en-US, so server and browser agree. */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** Dated release notes, newest first. */
export function Changelog({ title = "Changelog", entries, className, ...props }: ChangelogProps) {
  return (
    <section className={cn("mx-auto max-w-3xl px-4 py-16", className)} {...props}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <ol className="mt-10 space-y-12 border-l pl-6">
        {entries.map((e) => (
          <li key={e.date + e.title} className="relative">
            <span aria-hidden="true" className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-primary" />
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
          </li>
        ))}
      </ol>
    </section>
  );
}
