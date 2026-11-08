import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import type { HeroBaseProps } from "@/components/custom/hero/hero";

export interface HeroSpotlightProps extends HeroBaseProps, Omit<React.ComponentProps<"section">, "title"> {}

/** Background layers shared by the plain and motion versions. Decorative. */
export function SpotlightLayers({ glowRef }: { glowRef?: React.Ref<HTMLDivElement> }) {
  return (
    <>
      <div
        data-slot="spotlight-grid"
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)] bg-[size:40px_40px]"
      />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(560px_circle_at_var(--x,50%)_var(--y,35%),color-mix(in_oklch,var(--primary)_22%,transparent),transparent_70%)]"
      />
    </>
  );
}

/** Hero on a grid canvas with a soft glow in your primary color. */
export function HeroSpotlight({ titleAs: TitleTag = "h1",
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  ...props
}: HeroSpotlightProps) {
  return (
    <section className={cn("relative isolate overflow-hidden px-4 py-24 text-center", className)} {...props}>
      <SpotlightLayers />
      <div className="mx-auto max-w-3xl">
        {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
        <TitleTag className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-6xl">{title}</TitleTag>
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
      </div>
    </section>
  );
}
