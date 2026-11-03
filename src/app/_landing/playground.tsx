"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import React from "react";
import { ThemeSwatches } from "../_site/theme-swatches";
import { PLAYGROUND, densityClass, usageCode, type Density, type Variant } from "./playground-data";

/** Radio pill group used for the Version and Density controls. */
function Segmented<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">{legend}</legend>
      <span aria-hidden="true" className="text-muted-foreground">
        {legend}
      </span>
      <div className="inline-flex rounded-lg bg-muted p-1">
        {options.map((o) => (
          <label
            key={o.value}
            className="cursor-pointer rounded-md px-2.5 py-1 font-medium text-muted-foreground has-[:checked]:bg-background has-[:checked]:text-foreground has-[:checked]:shadow-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand"
          >
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Landing page playground: pick a hero, switch plain/motion, theme and
 * density, and watch both the preview and the usage code update.
 */
export function Playground({ sources }: { sources: Record<string, { plain: string; motion: string }> }) {
  const [slug, setSlug] = React.useState(PLAYGROUND[0].slug);
  const [variant, setVariant] = React.useState<Variant>("plain");
  const [density, setDensity] = React.useState<Density>("comfortable");
  const [replay, setReplay] = React.useState(0);
  const entry = PLAYGROUND.find((e) => e.slug === slug) ?? PLAYGROUND[0];
  const code = usageCode({ slug, variant, density });
  const source = sources[slug]?.[variant] ?? "";
  const file = variant === "motion" ? `${slug}-motion.tsx` : `${slug}.tsx`;

  return (
    <div className="theme-showcase">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]">
        <div className="flex items-center gap-2">
          <label htmlFor="pg-hero" className="text-muted-foreground">
            Hero
          </label>
          <select
            id="pg-hero"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="rounded-md border bg-card px-2 py-1.5 focus-visible:outline-2 focus-visible:outline-brand"
          >
            {PLAYGROUND.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <Segmented legend="Version" name="pg-variant" value={variant} onChange={setVariant} options={[{ value: "plain", label: "Plain" }, { value: "motion", label: "Motion" }]} />
        <Segmented legend="Density" name="pg-density" value={density} onChange={setDensity} options={[{ value: "compact", label: "Compact" }, { value: "comfortable", label: "Comfortable" }]} />
        <fieldset className="flex items-center gap-2">
          <legend className="sr-only">Theme color</legend>
          <span aria-hidden="true" className="text-muted-foreground">
            Theme
          </span>
          <ThemeSwatches name="pg-theme" />
        </fieldset>
        <button
          type="button"
          disabled={variant === "plain"}
          onClick={() => setReplay((r) => r + 1)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Replay animation
        </button>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Tabs defaultValue="usage" className="min-w-0">
          <TabsList>
            <TabsTrigger value="usage">usage.tsx</TabsTrigger>
            <TabsTrigger value="source">{file}</TabsTrigger>
          </TabsList>
          <TabsContent value="usage" className="mt-3">
            <pre tabIndex={0} className="h-[26rem] overflow-auto rounded-xl border bg-card p-4 font-mono text-[13px] leading-relaxed focus-visible:outline-2 focus-visible:outline-brand">
              <code data-testid="usage-code">{code}</code>
            </pre>
          </TabsContent>
          <TabsContent value="source" className="mt-3">
            <pre tabIndex={0} className="h-[26rem] overflow-auto rounded-xl border bg-card p-4 font-mono text-[12px] leading-relaxed focus-visible:outline-2 focus-visible:outline-brand">
              <code>{source}</code>
            </pre>
          </TabsContent>
        </Tabs>
        <div className="min-w-0 lg:pt-12">
          {/* Not inert: the theme-cycle preview's pause button must stay reachable. */}
          <div
            role="region"
            aria-label="Live preview"
            className={cn("theme-demo light grid h-[26rem] place-items-center overflow-hidden rounded-xl border bg-background text-foreground")}
          >
            <div key={`${slug}-${variant}-${replay}`} className="w-full">
              {entry.render(variant, densityClass(density))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
