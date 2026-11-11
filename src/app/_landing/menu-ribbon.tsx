"use client";

import { Pause, Play } from "lucide-react";
import Link from "next/link";
import React from "react";

const PLATES = ["bg-saffron", "bg-paprika", "bg-olive"];

/**
 * Every section as a plate on a slowly moving ribbon, like a tapas bar menu.
 * Moves for longer than 5s, so it has a pause button; it also pauses on hover and
 * keyboard focus, and stays still with reduced motion (CSS motion-safe).
 */
export function MenuRibbon({ items }: { items: { slug: string; title: string }[] }) {
  const [paused, setPaused] = React.useState(false);
  const row = (copy: boolean) => (
    <ul aria-hidden={copy || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {items.map((s, i) => (
        <li key={s.slug}>
          <Link
            href={`/docs/sections/${s.slug}`}
            tabIndex={copy ? -1 : undefined}
            className="flex items-center gap-2 rounded-full border bg-card/70 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:border-brand/50 hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
          >
            <span aria-hidden="true" className={`size-2.5 rounded-full ${PLATES[i % 3]}`} />
            {s.title}
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="All sections" className="relative border-y py-5">
      <div
        className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        data-paused={paused || undefined}
      >
        <div className="flex motion-safe:animate-[ribbon_60s_linear_infinite] group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] group-data-[paused]:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full border bg-background/90 text-muted-foreground backdrop-blur hover:text-foreground focus-visible:outline-2 focus-visible:outline-brand motion-reduce:hidden"
      >
        {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
        <span className="sr-only">{paused ? "Play section ribbon" : "Pause section ribbon"}</span>
      </button>
    </section>
  );
}
