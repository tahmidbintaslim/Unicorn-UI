import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import type { HeroBaseProps } from "@/components/custom/hero/hero";

export interface CycleTheme {
  name: string;
  /** Any CSS color, set as --primary */
  primary: string;
  /** Text color on primary, set as --primary-foreground */
  primaryForeground: string;
}

export interface HeroThemeCycleProps extends HeroBaseProps, Omit<React.ComponentProps<"section">, "title"> {
  /** A word in the title to highlight; ignored when the title doesn't contain it */
  accentWord: string;
  /** Themes the motion version cycles through */
  themes?: CycleTheme[];
  /** Milliseconds between themes in the motion version */
  interval?: number;
}

/** Default themes: shadcn's zinc, rose, blue, green and orange primaries. */
export const DEFAULT_CYCLE_THEMES: CycleTheme[] = [
  { name: "Blue", primary: "oklch(0.546 0.245 262.881)", primaryForeground: "oklch(0.97 0.014 254.604)" },
  { name: "Rose", primary: "oklch(0.586 0.253 17.585)", primaryForeground: "oklch(0.969 0.015 12.422)" },
  { name: "Green", primary: "oklch(0.527 0.154 150.069)", primaryForeground: "oklch(0.982 0.018 155.826)" },
  { name: "Orange", primary: "oklch(0.553 0.195 38.402)", primaryForeground: "oklch(0.98 0.016 73.684)" },
  { name: "Violet", primary: "oklch(0.541 0.281 293.009)", primaryForeground: "oklch(0.969 0.016 293.756)" },
];

/** Splits `title` around the first whole-word match of `word`. */
export function splitAccent(title: string, word: string): [string, string, string] | null {
  if (!word) return null;
  const match = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).exec(title);
  if (!match) return null;
  return [title.slice(0, match.index), match[0], title.slice(match.index + match[0].length)];
}

/** Hero whose accent word wears your primary color. The motion version cycles themes. */
export function HeroThemeCycle({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  accentWord,
  themes: _themes,
  interval: _interval,
  className,
  ...props
}: HeroThemeCycleProps) {
  void _themes;
  void _interval;
  const parts = splitAccent(title, accentWord);
  return (
    <section className={cn("mx-auto max-w-3xl px-4 py-16 text-center", className)} {...props}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
        {parts ? (
          <>
            {parts[0]}
            <span className="text-primary">{parts[1]}</span>
            {parts[2]}
          </>
        ) : (
          title
        )}
      </h1>
      {description && <p className="mt-5 text-lg text-pretty text-muted-foreground">{description}</p>}
      {(primaryAction || secondaryAction) && (
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {primaryAction && (
            <Button asChild size="lg">
              <a href={primaryAction.href}>{primaryAction.label}</a>
            </Button>
          )}
          {secondaryAction && (
            <Button asChild size="lg" variant="outline">
              <a href={secondaryAction.href}>{secondaryAction.label}</a>
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
