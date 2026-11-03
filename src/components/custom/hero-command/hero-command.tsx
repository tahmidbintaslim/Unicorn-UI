import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import type { HeroBaseProps } from "@/components/custom/hero/hero";
import { CopyButton } from "./copy-button";

export interface HeroCommandProps
  extends Omit<HeroBaseProps, "secondaryAction">,
    Omit<React.ComponentProps<"section">, "title"> {
  /** The command to show and copy, such as an install command */
  command: string;
  /** Accessible name of the copy button */
  copyLabel?: string;
}

/** Hero built around one command: the headline, then a big copyable command. */
export function HeroCommand({
  eyebrow,
  title,
  description,
  primaryAction,
  command,
  copyLabel = "Copy command",
  className,
  ...props
}: HeroCommandProps) {
  return (
    <section className={cn("mx-auto max-w-3xl px-4 py-16 text-center", className)} {...props}>
      {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 text-lg text-pretty text-muted-foreground">{description}</p>}
      <div className="mx-auto mt-8 flex max-w-full items-center gap-2 rounded-xl border bg-muted/50 py-2 pr-2 pl-4 text-left font-mono text-sm sm:w-fit">
        <span aria-hidden="true" className="text-muted-foreground">
          $
        </span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap">{command}</code>
        <CopyButton text={command} label={copyLabel} />
      </div>
      {primaryAction && (
        <div className="mt-6">
          <Button asChild variant="link">
            <a href={primaryAction.href}>{primaryAction.label}</a>
          </Button>
        </div>
      )}
    </section>
  );
}
