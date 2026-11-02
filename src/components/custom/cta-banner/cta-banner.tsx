import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export interface CtaBannerProps extends Omit<React.ComponentProps<"section">, "title"> {
  title: string;
  description?: string;
  actionLabel: string;
  actionHref: string;
}

/** Full-width call-to-action band: a heading, one line of text and one button. */
export function CtaBanner({
  title,
  description,
  actionLabel,
  actionHref,
  className,
  ...props
}: CtaBannerProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-4 rounded-xl bg-primary px-6 py-12 text-center text-primary-foreground",
        className,
      )}
      {...props}
    >
      <h2 className="text-3xl font-bold">{title}</h2>
      {description && <p className="max-w-xl opacity-90">{description}</p>}
      <Button asChild variant="secondary" size="lg">
        <a href={actionHref}>{actionLabel}</a>
      </Button>
    </section>
  );
}
