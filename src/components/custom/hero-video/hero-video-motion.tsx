"use client";

import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { HeroVideo, HeroVideoCopy, type HeroVideoProps } from "./hero-video";

const EASE = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * HeroVideo with motion: a poster with a play button that grows into the
 * player and starts it. Reduced motion gets the plain video with controls.
 */
export function HeroVideoMotion(props: HeroVideoProps) {
  const { poster, posterAlt, videoSrc, captionsSrc, className, ...rest } = props;
  const { eyebrow, title, titleAs, description, primaryAction, secondaryAction, ...sectionProps } = rest;
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const [playing, setPlaying] = React.useState(false);
  const video = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (!playing) return;
    // The play button unmounts, so hand keyboard focus to the player.
    video.current?.focus();
    void video.current?.play().catch(() => {});
  }, [playing]);

  // Server HTML and the first client render are the plain player; the poster
  // button only appears after mount, so hydration always matches.
  if (!mounted || reduced) return <HeroVideo {...props} />;

  return (
    <section className={cn("mx-auto max-w-5xl px-4 py-16 text-center", className)} {...sectionProps}>
      <HeroVideoCopy {...{ eyebrow, title, description, primaryAction, secondaryAction, titleAs }} />
      <div className="mt-12">
        {playing ? (
          <motion.video
            ref={video}
            layoutId="hero-video"
            tabIndex={0}
            controls
            poster={poster}
            aria-label={posterAlt}
            className="aspect-video w-full rounded-2xl border bg-muted shadow-xl"
            transition={{ duration: 0.5, ease: EASE }}
          >
            <source src={videoSrc} />
            {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />}
          </motion.video>
        ) : (
          <motion.button
            type="button"
            layoutId="hero-video"
            aria-label={`Play video: ${posterAlt}`}
            onClick={() => setPlaying(true)}
            className="group relative block aspect-video w-full overflow-hidden rounded-2xl border bg-muted shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps the section framework-agnostic */}
            <img src={poster} alt="" className="size-full object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-foreground/10">
              <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                <Play aria-hidden="true" className="size-6 translate-x-0.5" />
              </span>
            </span>
          </motion.button>
        )}
      </div>
    </section>
  );
}
