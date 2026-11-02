import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export interface HeroAction {
  label: string;
  href: string;
}

export interface HeroProps extends Omit<React.ComponentProps<"section">, "title"> {
  /** Small label above the title */
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
}

/** Centered landing-page hero with an optional badge and up to two links. */
export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  ...props
}: HeroProps) {
  return (
    <section
      className={cn("mx-auto max-w-3xl px-4 py-16 text-center", className)}
      {...props}
    >
      {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      )}
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
