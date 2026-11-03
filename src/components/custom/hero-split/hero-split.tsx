import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import type { HeroBaseProps } from "@/components/custom/hero/hero";

export interface HeroSplitProps extends HeroBaseProps, Omit<React.ComponentProps<"section">, "title"> {
  /** Product image, video or any component shown beside the copy */
  media: React.ReactNode;
  /** Which side the media sits on from the lg breakpoint. Phones stack copy first. */
  mediaPosition?: "left" | "right";
}

/** Two-column hero: copy on one side, your product on the other. */
export function HeroSplit({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  media,
  mediaPosition = "right",
  className,
  ...props
}: HeroSplitProps) {
  return (
    <section
      className={cn("mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2", className)}
      {...props}
    >
      <div className={cn("text-center lg:text-left", mediaPosition === "left" && "lg:order-2")}>
        {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 text-lg text-pretty text-muted-foreground">{description}</p>}
        {(primaryAction || secondaryAction) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
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
      <div data-slot="hero-media" className={cn("min-w-0", mediaPosition === "left" && "lg:order-1")}>
        {media}
      </div>
    </section>
  );
}
