import { Hero, HeroMotion } from "@/components/custom/hero";
import { HeroCommand, HeroCommandMotion } from "@/components/custom/hero-command";
import { HeroSplit, HeroSplitMotion } from "@/components/custom/hero-split";
import { HeroSpotlight, HeroSpotlightMotion } from "@/components/custom/hero-spotlight";
import { HeroThemeCycle, HeroThemeCycleMotion } from "@/components/custom/hero-theme-cycle";
import type React from "react";

export type Variant = "plain" | "motion";
export type Density = "compact" | "comfortable";
export interface PlaygroundState {
  slug: string;
  variant: Variant;
  density: Density;
}

export const densityClass = (d: Density) => (d === "compact" ? "py-10" : "py-20");

function Chart() {
  return (
    <div role="img" aria-label="Sample chart" className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex h-28 items-end gap-1.5">
        {[40, 55, 48, 72, 66, 90, 84, 100].map((h, i) => (
          <span key={i} className="flex-1 rounded-t bg-primary" style={{ height: `${h}%`, opacity: 0.35 + i * 0.08 }} />
        ))}
      </div>
    </div>
  );
}

interface Entry {
  slug: string;
  label: string;
  /** Component name in code, without the Motion suffix */
  name: string;
  render: (variant: Variant, className: string) => React.ReactNode;
  /** JSX props lines for the usage snippet */
  propLines: string[];
}

const base = { title: "Ship your landing page today", primaryAction: { label: "Get started", href: "#start" } };

export const PLAYGROUND: Entry[] = [
  {
    slug: "hero",
    label: "Centered",
    name: "Hero",
    render: (v, c) => (v === "motion" ? <HeroMotion {...base} eyebrow="New" className={c} /> : <Hero {...base} eyebrow="New" className={c} />),
    propLines: ['eyebrow="New"', 'title="Ship your landing page today"', 'primaryAction={{ label: "Get started", href: "/signup" }}'],
  },
  {
    slug: "hero-split",
    label: "Split",
    name: "HeroSplit",
    render: (v, c) =>
      v === "motion" ? <HeroSplitMotion {...base} media={<Chart />} className={c} /> : <HeroSplit {...base} media={<Chart />} className={c} />,
    propLines: ['title="Ship your landing page today"', 'primaryAction={{ label: "Get started", href: "/signup" }}', "media={<Screenshot />}"],
  },
  {
    slug: "hero-command",
    label: "Command",
    name: "HeroCommand",
    render: (v, c) => {
      const p = { title: "Install it in one line", command: "npx shadcn@latest add https://tapas-ui.vercel.app/r/hero.json", className: c };
      return v === "motion" ? <HeroCommandMotion {...p} /> : <HeroCommand {...p} />;
    },
    propLines: ['title="Install it in one line"', 'command="npx shadcn@latest add https://tapas-ui.vercel.app/r/hero.json"'],
  },
  {
    slug: "hero-spotlight",
    label: "Spotlight",
    name: "HeroSpotlight",
    render: (v, c) => (v === "motion" ? <HeroSpotlightMotion {...base} className={c} /> : <HeroSpotlight {...base} className={c} />),
    propLines: ['title="Ship your landing page today"', 'primaryAction={{ label: "Get started", href: "/signup" }}'],
  },
  {
    slug: "hero-theme-cycle",
    label: "Theme cycle",
    name: "HeroThemeCycle",
    render: (v, c) => {
      const p = { title: "Your theme, not ours", accentWord: "theme", primaryAction: base.primaryAction, className: c };
      return v === "motion" ? <HeroThemeCycleMotion {...p} /> : <HeroThemeCycle {...p} />;
    },
    propLines: ['title="Your theme, not ours"', 'accentWord="theme"', 'primaryAction={{ label: "Get started", href: "/signup" }}'],
  },
];

/** The usage snippet for the current state. */
export function usageCode({ slug, variant, density }: PlaygroundState): string {
  const entry = PLAYGROUND.find((e) => e.slug === slug) ?? PLAYGROUND[0];
  const component = variant === "motion" ? `${entry.name}Motion` : entry.name;
  const from = variant === "motion" ? `@/components/custom/${entry.slug}/${entry.slug}-motion` : `@/components/custom/${entry.slug}`;
  const lines = [`className="${densityClass(density)}"`, ...entry.propLines].map((l) => `  ${l}`);
  return `import { ${component} } from "${from}";\n\n<${component}\n${lines.join("\n")}\n/>`;
}
