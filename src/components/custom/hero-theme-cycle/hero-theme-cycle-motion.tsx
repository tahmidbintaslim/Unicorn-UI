"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { DEFAULT_CYCLE_THEMES, HeroThemeCycle, splitAccent, type HeroThemeCycleProps } from "./hero-theme-cycle";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * HeroThemeCycle with motion: every `interval` the hero switches to the next
 * theme, so the accent word, badge and buttons all re-color. It stops on
 * hover, on keyboard focus and with the visible pause button.
 */
export function HeroThemeCycleMotion(props: HeroThemeCycleProps) {
  const {
    eyebrow,
    title,
    description,
    primaryAction,
    secondaryAction,
    accentWord,
    themes = DEFAULT_CYCLE_THEMES,
    interval = 2500,
    className,
    style,
    ...rest
  } = props;
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [held, setHeld] = React.useState(false);

  React.useEffect(() => {
    if (!animate || paused || held || themes.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % themes.length), interval);
    return () => window.clearInterval(id);
  }, [animate, paused, held, interval, themes.length]);

  if (!animate) return <HeroThemeCycle {...props} />;

  const theme = themes[index % themes.length];
  const parts = splitAccent(title, accentWord);
  const vars = { "--primary": theme.primary, "--primary-foreground": theme.primaryForeground } as React.CSSProperties;

  return (
    <section
      className={cn("mx-auto max-w-3xl px-4 py-16 text-center [&_*]:transition-colors [&_*]:duration-500", className)}
      style={{ ...style, ...vars }}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      {...rest}
    >
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
        {parts ? (
          <>
            {parts[0]}
            <motion.span
              key={index}
              // Inline (not inline-block) so the word keeps wrapping with the punctuation after it.
              className="text-primary"
              initial={{ filter: "blur(6px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {parts[1]}
            </motion.span>
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
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <button
          type="button"
          aria-pressed={paused}
          aria-label="Pause color cycling"
          onClick={() => setPaused((p) => !p)}
          className="inline-grid size-8 place-items-center rounded-full border transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
        </button>
        <span aria-live="off">{theme.name}</span>
      </div>
    </section>
  );
}
