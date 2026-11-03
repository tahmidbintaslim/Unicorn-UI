import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import type { HeroBaseProps } from "@/components/custom/hero/hero";

export interface HeroWaitlistProps
  extends Omit<HeroBaseProps, "primaryAction" | "secondaryAction">,
    Omit<React.ComponentProps<"section">, "title"> {
  /** Where the form posts, such as your API route or a form service URL */
  action: string;
  method?: "post" | "get";
  inputLabel?: string;
  buttonLabel?: string;
  /** Small print under the form, such as "No spam." */
  note?: string;
}

/** Hero with an email signup. A plain HTML form: works without JavaScript. */
export function HeroWaitlist({
  eyebrow,
  title,
  description,
  action,
  method = "post",
  inputLabel = "Email address",
  buttonLabel = "Join the waitlist",
  note,
  className,
  ...props
}: HeroWaitlistProps) {
  const id = React.useId();
  return (
    <section className={cn("mx-auto max-w-2xl px-4 py-16 text-center", className)} {...props}>
      {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 text-lg text-pretty text-muted-foreground">{description}</p>}
      <form action={action} method={method} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
        <label htmlFor={id} className="sr-only">
          {inputLabel}
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="placeholder:text-muted-foreground h-10 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
        <Button type="submit" size="lg">
          {buttonLabel}
        </Button>
      </form>
      {note && <p className="mt-3 text-sm text-muted-foreground">{note}</p>}
    </section>
  );
}
