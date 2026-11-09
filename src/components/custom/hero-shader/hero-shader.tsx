import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import type { HeroBaseProps } from "@/components/custom/hero/hero";

export interface HeroShaderProps extends HeroBaseProps, Omit<React.ComponentProps<"section">, "title"> {}

/** Soft gradient in your primary color. The plain hero's whole background, and the motion hero's fallback. Decorative. */
export function ShaderBackdrop() {
  return (
    <div
      data-slot="shader-backdrop"
      aria-hidden="true"
      className="absolute inset-0 -z-20 bg-[radial-gradient(60%_50%_at_30%_30%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent),radial-gradient(50%_45%_at_75%_60%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent)]"
    />
  );
}

/** Badge, heading, description and links, shared by the plain and motion versions. */
export function HeroShaderCopy({ titleAs: TitleTag = "h1", eyebrow, title, description, primaryAction, secondaryAction }: HeroBaseProps) {
  return (
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
  );
}

/** Hero on a soft gradient in your primary color. The motion version paints it live with WebGL. */
export function HeroShader({ titleAs, eyebrow, title, description, primaryAction, secondaryAction, className, ...props }: HeroShaderProps) {
  return (
    <section className={cn("relative isolate overflow-hidden px-4 py-28 text-center", className)} {...props}>
      <ShaderBackdrop />
      <HeroShaderCopy {...{ titleAs, eyebrow, title, description, primaryAction, secondaryAction }} />
    </section>
  );
}
