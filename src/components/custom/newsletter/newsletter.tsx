import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export interface NewsletterProps extends Omit<React.ComponentProps<"section">, "title"> {
  title: string;
  description?: string;
  /** Where the form posts: your API route or a newsletter service URL */
  action: string;
  method?: "post" | "get";
  inputLabel?: string;
  buttonLabel?: string;
  note?: string;
  /** Name of a hidden spam-trap field; your endpoint should drop submissions that fill it. */
  honeypotName?: string;
}

export const inputClass =
  "h-10 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm shadow-xs outline-none transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

/** Hidden field that bots fill and people never see. */
export function Honeypot({ name }: { name?: string }) {
  if (!name) return null;
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Leave this empty
        <input name={name} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

/** Newsletter signup band. A plain HTML form: works without JavaScript. */
export function Newsletter({
  title,
  description,
  action,
  method = "post",
  inputLabel = "Email address",
  buttonLabel = "Subscribe",
  note,
  honeypotName,
  className,
  ...props
}: NewsletterProps) {
  const id = React.useId();
  return (
    <section className={cn("mx-auto max-w-5xl px-4 py-16", className)} {...props}>
      <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && <p className="mt-2 text-muted-foreground">{description}</p>}
        </div>
        <div className="w-full md:max-w-sm">
          <form action={action} method={method} className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor={id} className="sr-only">
              {inputLabel}
            </label>
            <input id={id} name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
            <Button type="submit">{buttonLabel}</Button>
            <Honeypot name={honeypotName} />
          </form>
          {note && <p className="mt-2 text-xs text-muted-foreground">{note}</p>}
        </div>
      </div>
    </section>
  );
}
