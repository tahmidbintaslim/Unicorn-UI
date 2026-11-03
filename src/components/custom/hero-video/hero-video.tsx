import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import type { HeroBaseProps } from "@/components/custom/hero/hero";

export interface HeroVideoProps extends HeroBaseProps, Omit<React.ComponentProps<"section">, "title"> {
  /** Image shown before the video plays */
  poster: string;
  /** What the video shows, for the play button's label */
  posterAlt: string;
  videoSrc: string;
  /** WebVTT captions file */
  captionsSrc?: string;
}

/** Copy block shared by the plain and motion versions. */
export function HeroVideoCopy({ eyebrow, title, description, primaryAction, secondaryAction }: HeroBaseProps) {
  return (
    <>
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
    </>
  );
}

/** Hero with a product video under the headline. The video never autoplays. */
export function HeroVideo({ poster, posterAlt, videoSrc, captionsSrc, className, ...props }: HeroVideoProps) {
  const { eyebrow, title, description, primaryAction, secondaryAction, ...rest } = props;
  return (
    <section className={cn("mx-auto max-w-5xl px-4 py-16 text-center", className)} {...rest}>
      <HeroVideoCopy {...{ eyebrow, title, description, primaryAction, secondaryAction }} />
      <video
        controls
        preload="none"
        poster={poster}
        aria-label={posterAlt}
        className="mt-12 aspect-video w-full rounded-2xl border bg-muted shadow-xl"
      >
        <source src={videoSrc} />
        {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />}
      </video>
    </section>
  );
}
