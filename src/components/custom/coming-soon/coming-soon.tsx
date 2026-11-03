import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export interface ComingSoonProps extends Omit<React.ComponentProps<"section">, "title"> {
  title: string;
  description?: string;
  /** Where the notify form posts */
  action: string;
  /** ISO date of the launch, if you have one. No fake countdowns. */
  launchDate?: string;
  badge?: string;
  buttonLabel?: string;
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** Pre-launch page section: what's coming, when, and a way to get notified. */
export function ComingSoon({
  title,
  description,
  action,
  launchDate,
  badge = "Coming soon",
  buttonLabel = "Notify me",
  className,
  ...props
}: ComingSoonProps) {
  const id = React.useId();
  return (
    <section className={cn("mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center", className)} {...props}>
      <Badge variant="secondary">{badge}</Badge>
      <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 text-lg text-pretty text-muted-foreground">{description}</p>}
      {launchDate && (
        <p className="mt-4 text-sm font-medium">
          Launching <time dateTime={launchDate}>{formatDate(launchDate)}</time>
        </p>
      )}
      <form action={action} method="post" className="mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row">
        <label htmlFor={id} className="sr-only">
          Email address
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
    </section>
  );
}
