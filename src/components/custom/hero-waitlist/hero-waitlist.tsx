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
  /** Name of a hidden field that people never see; bots fill it in. Drop submissions where it isn't empty. */
  honeypotName?: string;
}

/** Hero with an email signup. A plain HTML form: works without JavaScript. */
export function HeroWaitlist({ titleAs: TitleTag = "h1",
  eyebrow,
  title,
  description,
  action,
  method = "post",
  inputLabel = "Email address",
  buttonLabel = "Join the waitlist",
  note,
  honeypotName,
  className,
  ...props
}: HeroWaitlistProps) {
  const id = React.useId();
  return (
    <section className={cn("mx-auto max-w-2xl px-4 py-16 text-center", className)} {...props}>
      {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
      <TitleTag className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">{title}</TitleTag>
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
          className="placeholder:text-muted-foreground h-11 min-w-0 rounded-md border bg-background px-3 text-base shadow-xs sm:h-10 sm:flex-1 sm:text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
        <Button type="submit" size="lg">
          {buttonLabel}
        </Button>
        {honeypotName && (
          // Bots fill every field; people never see this one. Your endpoint should drop submissions that fill it.
          <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
            <label>
              Leave this empty
              <input name={honeypotName} tabIndex={-1} autoComplete="off" />
            </label>
          </div>
        )}
      </form>
      {note && <p className="mt-3 text-sm text-muted-foreground">{note}</p>}
    </section>
  );
}
