import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export interface CtaSplitProps extends Omit<React.ComponentProps<"section">, "title"> {
  title: string;
  description?: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  /** Image or component beside the copy */
  media: React.ReactNode;
}

/** Copy block shared by the plain and motion versions. */
export function CtaSplitCopy({ title, description, primaryAction, secondaryAction }: Omit<CtaSplitProps, "media">) {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-balance">{title}</h2>
      {description && <p className="mt-3 text-pretty text-muted-foreground">{description}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <a href={primaryAction.href}>{primaryAction.label}</a>
        </Button>
        {secondaryAction && (
          <Button asChild size="lg" variant="outline">
            <a href={secondaryAction.href}>{secondaryAction.label}</a>
          </Button>
        )}
      </div>
    </div>
  );
}

/** Call-to-action band with your product beside it. */
export function CtaSplit({ media, className, ...props }: CtaSplitProps) {
  const { title, description, primaryAction, secondaryAction, ...rest } = props;
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...rest}>
      <div className="grid items-center gap-10 overflow-hidden rounded-2xl border bg-muted/40 p-8 sm:p-12 lg:grid-cols-2">
        <CtaSplitCopy {...{ title, description, primaryAction, secondaryAction }} />
        <div className="min-w-0">{media}</div>
      </div>
    </section>
  );
}
