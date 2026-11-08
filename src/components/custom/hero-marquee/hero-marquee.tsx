import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import type { HeroBaseProps } from "@/components/custom/hero/hero";

export interface MarqueeItem {
  /** Company or product name; read by screen readers even when a logo is shown */
  name: string;
  logo?: React.ReactNode;
}

export interface HeroMarqueeProps extends HeroBaseProps, Omit<React.ComponentProps<"section">, "title"> {
  items: MarqueeItem[];
  /** Seconds per full loop in the motion version */
  speed?: number;
}

/** One marquee item: the logo with its name for screen readers, or the name as text. */
export function MarqueeEntry({ item }: { item: MarqueeItem }) {
  return (
    <li className="flex shrink-0 items-center">
      {item.logo ? (
        <>
          <span aria-hidden="true">{item.logo}</span>
          <span className="sr-only">{item.name}</span>
        </>
      ) : (
        <span className="text-lg font-semibold whitespace-nowrap text-muted-foreground">{item.name}</span>
      )}
    </li>
  );
}

/** Hero over a row of logos or product names. */
export function HeroMarquee({ titleAs: TitleTag = "h1",
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  items,
  speed: _speed,
  className,
  ...props
}: HeroMarqueeProps) {
  void _speed;
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
      <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {items.map((item) => (
          <MarqueeEntry key={item.name} item={item} />
        ))}
      </ul>
    </section>
  );
}
