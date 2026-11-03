"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import React from "react";
import { HeroMarquee, MarqueeEntry, type HeroMarqueeProps } from "./hero-marquee";

const noop = () => () => {};

/** How many copies of the items fill one loop plus the copy sliding in. */
export function copiesNeeded(containerWidth: number, copyWidth: number) {
  if (copyWidth <= 0) return 2;
  return Math.max(2, Math.ceil(containerWidth / copyWidth) + 1);
}
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * HeroMarquee with motion: the row scrolls endlessly. It pauses on hover, on
 * keyboard focus and with the visible pause button. Reduced motion gets the
 * plain wrapped row.
 */
export function HeroMarqueeMotion(props: HeroMarqueeProps) {
  const { eyebrow, title, description, primaryAction, secondaryAction, items, speed = 30, className, ...rest } = props;
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const [paused, setPaused] = React.useState(false);
  const [held, setHeld] = React.useState(false);
  const x = useMotionValue(0);
  const track = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef<HTMLDivElement>(null);
  const first = React.useRef<HTMLUListElement>(null);
  const [copies, setCopies] = React.useState(2);

  // Few or narrow items would leave a gap before the loop jumps back, so
  // repeat them until one copy past the container is always ready.
  React.useEffect(() => {
    if (!animate || !frame.current || !first.current) return;
    const measure = () => setCopies(copiesNeeded(frame.current!.clientWidth, first.current!.scrollWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame.current);
    return () => ro.disconnect();
  }, [animate, items]);

  useAnimationFrame((_, delta) => {
    if (!animate || paused || held || !track.current) return;
    const loop = first.current?.scrollWidth ?? 0;
    if (!loop) return;
    let next = x.get() - (loop / speed) * (delta / 1000);
    if (next <= -loop) next += loop;
    x.set(next);
  });

  if (!animate) return <HeroMarquee {...props} />;

  return (
    <section className={cn("mx-auto max-w-5xl px-4 py-16 text-center", className)} {...rest}>
      {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
      <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">{title}</h1>
      {description && <p className="mx-auto mt-4 max-w-2xl text-lg text-pretty text-muted-foreground">{description}</p>}
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
      <div
        ref={frame}
        className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
      >
        <motion.div ref={track} className="flex w-max" style={{ x }}>
          <ul ref={first} className="flex shrink-0 items-center gap-12 pr-12">
            {items.map((item) => (
              <MarqueeEntry key={item.name} item={item} />
            ))}
          </ul>
          {Array.from({ length: copies - 1 }, (_, c) => (
            <ul key={c} data-slot="marquee-clone" aria-hidden="true" inert className="flex shrink-0 items-center gap-12 pr-12">
              {items.map((item) => (
                <MarqueeEntry key={item.name} item={item} />
              ))}
            </ul>
          ))}
        </motion.div>
      </div>
      <button
        type="button"
        aria-pressed={paused}
        aria-label="Pause scrolling"
        onClick={() => setPaused((p) => !p)}
        className="mt-6 inline-grid size-8 place-items-center rounded-full border text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
      </button>
    </section>
  );
}
