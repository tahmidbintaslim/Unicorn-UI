"use client";

import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import React from "react";
import {
  TestimonialsWall,
  WallCard,
  type TestimonialsWallProps,
  type WallTestimonial,
} from "./testimonials-wall";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () =>
  React.useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

function Column({
  items,
  y,
  measure,
}: {
  items: WallTestimonial[];
  y: MotionValue<number>;
  measure: React.Ref<HTMLDivElement>;
}) {
  return (
    <motion.div style={{ y }} className="min-w-0">
      <div ref={measure}>
        {items.map((item) => (
          <WallCard key={item.author + item.quote} item={item} />
        ))}
      </div>
      {/* Second copy keeps the loop seamless; screen readers and Tab skip it. */}
      <div aria-hidden="true" inert>
        {items.map((item) => (
          <WallCard key={item.author + item.quote} item={item} />
        ))}
      </div>
    </motion.div>
  );
}

/**
 * TestimonialsWall with motion: three columns drift upward at different
 * speeds. It pauses on hover, on keyboard focus and with the pause button.
 */
export function TestimonialsWallMotion(props: TestimonialsWallProps) {
  const { title, description, items, className, ...rest } = props;
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const on = animate && items.length > 0;
  const [paused, setPaused] = React.useState(false);
  const [held, setHeld] = React.useState(false);
  const ys = [useMotionValue(0), useMotionValue(0), useMotionValue(0)];
  const refs = [
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null),
  ];
  const speeds = [18, 26, 21]; // px per second

  useAnimationFrame((_, delta) => {
    if (!animate || paused || held) return;
    ys.forEach((y, i) => {
      const h = refs[i].current?.offsetHeight ?? 0;
      if (!h) return;
      let next = y.get() - (speeds[i] * delta) / 1000;
      if (next <= -h) next += h;
      y.set(next);
    });
  });

  const columns = [0, 1, 2].map((c) => items.filter((_, i) => i % 3 === c));

  return (
    <>
      {/* Below lg only one column would fit, so smaller screens get the plain wall with every quote.
          It is also the server render; the drifting wall is added beside it after mount, so hydration keeps its DOM. */}
      <TestimonialsWall {...props} className={cn(className, on && "lg:hidden")} />
      {on && (
      <section
        className={cn(
          "mx-auto hidden max-w-6xl px-4 py-16 lg:block",
          className,
        )}
        {...rest}
      >
        {title && (
          <h2 className="text-center text-3xl font-bold tracking-tight text-balance">
            {title}
          </h2>
        )}
        {description && (
          <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">
            {description}
          </p>
        )}
        <div
          className="mt-10 grid h-[36rem] gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] grid-cols-3"
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={() => setHeld(false)}
        >
          {columns.map((col, i) => (
            <div key={i}>
              <Column items={col} y={ys[i]} measure={refs[i]} />
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            type="button"
            aria-pressed={paused}
            aria-label="Pause scrolling"
            onClick={() => {
              setHeld(false);
              setPaused((p) => !p);
            }}
            className="inline-grid size-8 place-items-center rounded-full border text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            {paused ? (
              <Play aria-hidden="true" className="size-3.5" />
            ) : (
              <Pause aria-hidden="true" className="size-3.5" />
            )}
          </button>
        </div>
      </section>
      )}
    </>
  );
}
