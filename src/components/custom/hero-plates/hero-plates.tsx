import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import type { HeroBaseProps } from "@/components/custom/hero/hero";

export interface Plate {
  label: string;
  /** Optional small preview inside the plate */
  content?: React.ReactNode;
}

export interface HeroPlatesProps extends HeroBaseProps, Omit<React.ComponentProps<"section">, "title"> {
  /** The parts of the page, top to bottom (3 to 6 read best) */
  plates: Plate[];
}

/** Copy column shared by the plain and motion versions. */
export function HeroPlatesCopy({ eyebrow, title, description, primaryAction, secondaryAction }: HeroBaseProps) {
  return (
    <div className="text-center lg:text-left">
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
  );
}

export const plateClass = "rounded-xl border bg-card px-5 py-4 text-left text-sm font-medium shadow-sm";

/** Hero that shows a page as a stack of section "plates". */
export function HeroPlates({ plates, className, ...props }: HeroPlatesProps) {
  const { eyebrow, title, description, primaryAction, secondaryAction, ...rest } = props;
  return (
    <section className={cn("mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2", className)} {...rest}>
      <HeroPlatesCopy {...{ eyebrow, title, description, primaryAction, secondaryAction }} />
      <ul className="mx-auto flex w-full max-w-md flex-col gap-3">
        {plates.map((plate, i) => (
          <li key={plate.label} className={cn(plateClass, i % 2 ? "ml-6" : "mr-6")}>
            {plate.label}
            {plate.content}
          </li>
        ))}
      </ul>
    </section>
  );
}
