import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import type { HeroBaseProps } from "@/components/custom/hero/hero";

export interface HeroShowcaseProps extends HeroBaseProps, Omit<React.ComponentProps<"section">, "title"> {
  /** The live component to show off under the headline */
  children: React.ReactNode;
}

/** Headline over a framed slot for a real, working component. */
export function HeroShowcase({ titleAs: TitleTag = "h1",
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  className,
  ...props
}: HeroShowcaseProps) {
  return (
    <section className={cn("mx-auto max-w-5xl px-4 py-16 text-center", className)} {...props}>
      {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
      <TitleTag className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">{title}</TitleTag>
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
      <div data-slot="showcase-frame" className="mt-12 rounded-2xl border bg-card p-2 text-left shadow-xl sm:p-3">
        {children}
      </div>
    </section>
  );
}
