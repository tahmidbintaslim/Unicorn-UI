import { cn } from "@/lib/utils";

/**
 * Small wireframe of a section for the catalogue tiles. Purely decorative:
 * the tile's heading names the section.
 */
const bar = "rounded-[3px] bg-muted-foreground/25";
const ink = "rounded-[3px] bg-foreground/80";

function Line({ className }: { className: string }) {
  return <span className={cn("block", className)} />;
}

const SKETCHES: Record<string, React.ReactNode> = {
  "hero-split": (
    <div className="flex w-60 items-center gap-3">
      <div className="flex flex-1 flex-col gap-1.5">
        <Line className={cn(ink, "h-3 w-24")} />
        <Line className={cn(ink, "h-3 w-16")} />
        <Line className={cn(bar, "mt-1 h-1.5 w-20")} />
        <Line className="mt-2 h-4 w-11 rounded-[5px] bg-brand" />
      </div>
      <div className="flex h-24 w-24 items-end gap-1 rounded-lg bg-muted p-2">
        {[40, 60, 50, 80, 100].map((h) => (
          <span key={h} className="flex-1 rounded-t-sm bg-brand/70" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  ),
  "hero-command": (
    <div className="flex w-56 flex-col items-center gap-2">
      <Line className={cn(ink, "h-3.5 w-44")} />
      <Line className={cn(bar, "h-1.5 w-28")} />
      <div className="mt-2 flex w-full items-center gap-1.5 rounded-md bg-muted px-2.5 py-2">
        <span className="font-mono text-[9px] text-muted-foreground">$</span>
        <Line className="h-1.5 w-32 rounded-[3px] bg-foreground/70" />
        <span className="h-2.5 w-1 animate-pulse bg-brand" />
      </div>
    </div>
  ),
  "hero-spotlight": (
    <div className="relative grid h-28 w-60 place-items-center overflow-hidden rounded-lg bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:16px_16px]">
      <span className="absolute size-24 rounded-full bg-brand/25 blur-2xl" />
      <div className="relative flex flex-col items-center gap-1.5">
        <Line className={cn(ink, "h-3 w-36")} />
        <Line className={cn(bar, "h-1.5 w-24")} />
      </div>
    </div>
  ),
  "hero-theme-cycle": (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5">
        <Line className={cn(ink, "h-3.5 w-16")} />
        <Line className="h-3.5 w-14 rounded-[4px] bg-brand" />
        <Line className={cn(ink, "h-3.5 w-12")} />
      </div>
      <div className="mt-2 flex gap-1.5">
        {["bg-blue-500", "bg-rose-500", "bg-green-600", "bg-brand", "bg-violet-500"].map((c) => (
          <span key={c} className={cn("size-3 rounded-full", c)} />
        ))}
      </div>
    </div>
  ),
  "hero-plates": (
    <div className="flex w-48 flex-col gap-1.5">
      {["w-40", "ml-5 w-40", "w-40", "ml-5 w-40"].map((c, i) => (
        <span key={i} className={cn("h-5 rounded-md bg-muted", c, i === 1 && "bg-brand/70")} />
      ))}
    </div>
  ),
  hero: (
    <div className="flex w-56 flex-col items-center gap-2">
      <Line className={cn(bar, "h-1.5 w-24")} />
      <Line className={cn(ink, "h-3.5 w-52")} />
      <Line className={cn(ink, "h-3.5 w-36")} />
      <Line className={cn(bar, "mt-1 h-1.5 w-32")} />
      <div className="mt-2 flex gap-1.5">
        <Line className="h-4 w-11 rounded-[5px] bg-brand" />
        <Line className="h-4 w-11 rounded-[5px] bg-muted" />
      </div>
    </div>
  ),
  navbar: (
    <div className="flex w-60 items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
      <span className="size-3 rounded-full bg-brand" />
      <Line className={cn(ink, "h-1.5 w-9")} />
      <div className="ml-auto flex gap-2">
        <Line className={cn(bar, "h-1 w-5")} />
        <Line className={cn(bar, "h-1 w-5")} />
        <Line className={cn(bar, "h-1 w-5")} />
      </div>
      <Line className="ml-2 h-4 w-9 rounded-[5px] bg-foreground/85" />
    </div>
  ),
  "bento-grid": (
    <div className="grid w-60 grid-cols-3 grid-rows-2 gap-1.5">
      <span className="col-span-2 h-12 rounded-md bg-muted" />
      <span className="row-span-2 rounded-md bg-brand" />
      <span className="h-12 rounded-md bg-muted" />
      <span className="h-12 rounded-md bg-muted" />
    </div>
  ),
  "pricing-card": (
    <div className="flex items-end gap-2">
      {[false, true, false].map((popular, i) => (
        <div
          key={i}
          className={cn(
            "flex w-16 flex-col gap-1.5 rounded-lg bg-muted p-2",
            popular && "outline-2 outline-brand",
          )}
        >
          <Line className={cn(bar, "h-1 w-6")} />
          <Line className={cn(ink, "h-2.5 w-9")} />
          <Line className={cn(bar, "mt-1 h-1 w-12")} />
          <Line className={cn(bar, "h-1 w-10")} />
          <Line className={cn("mt-1 h-3 w-full rounded-[4px]", popular ? "bg-brand" : "bg-muted-foreground/30")} />
        </div>
      ))}
    </div>
  ),
  faq: (
    <div className="flex w-56 flex-col gap-1.5">
      {[true, false, false, false].map((open, i) => (
        <div key={i} className="flex items-center justify-between rounded-md bg-muted px-2.5 py-2">
          <Line className={cn(ink, "h-1.5 w-28")} />
          <span className={cn("size-1.5 rounded-full", open ? "bg-brand" : "bg-muted-foreground/40")} />
        </div>
      ))}
    </div>
  ),
  "cta-banner": (
    <div className="flex w-60 items-center justify-between rounded-xl bg-brand px-4 py-5">
      <div className="flex flex-col gap-1.5">
        <Line className="h-2.5 w-28 rounded-[3px] bg-brand-foreground/85" />
        <Line className="h-1.5 w-20 rounded-[3px] bg-brand-foreground/45" />
      </div>
      <Line className="h-5 w-14 rounded-[5px] bg-brand-foreground" />
    </div>
  ),
  "logo-cloud": (
    <div className="flex flex-col items-center gap-3">
      <Line className={cn(bar, "h-1 w-20")} />
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <Line key={i} className="h-3 w-9 rounded-[3px] bg-muted-foreground/35" />
        ))}
      </div>
    </div>
  ),
  "testimonial-card": (
    <div className="flex w-48 flex-col gap-1.5 rounded-lg bg-muted p-3">
      <Line className="h-2.5 w-3.5 rounded-[2px] bg-brand" />
      <Line className={cn(ink, "mt-1 h-1 w-40")} />
      <Line className={cn(ink, "h-1 w-36")} />
      <Line className={cn(ink, "h-1 w-24")} />
      <div className="mt-2 flex items-center gap-2">
        <span className="size-4 rounded-full bg-muted-foreground/40" />
        <Line className={cn(ink, "h-1 w-14")} />
      </div>
    </div>
  ),
  footer: (
    <div className="flex w-60 flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1.5">
          <Line className={cn(ink, "h-2 w-12")} />
          <Line className={cn(bar, "h-1 w-16")} />
        </div>
        <div className="flex gap-3">
          {[0, 1, 2].map((c) => (
            <div key={c} className="flex flex-col gap-1.5">
              <Line className={cn(ink, "h-1 w-6")} />
              <Line className={cn(bar, "h-1 w-8")} />
              <Line className={cn(bar, "h-1 w-7")} />
            </div>
          ))}
        </div>
      </div>
      <span className="h-px w-full bg-border" />
      <Line className={cn(bar, "h-1 w-20")} />
    </div>
  ),
};

export function SectionSketch({ slug }: { slug: string }) {
  return (
    <div aria-hidden="true" className="flex h-44 items-center justify-center">
      {SKETCHES[slug] ?? null}
    </div>
  );
}

export const SKETCHED_SLUGS = Object.keys(SKETCHES);
