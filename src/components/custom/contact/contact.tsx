import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export interface ContactDetail {
  label: string;
  value: string;
  href?: string;
}

export interface ContactProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  /** Where the form posts */
  action: string;
  method?: "post" | "get";
  details?: ContactDetail[];
  submitLabel?: string;
}

const field =
  "mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

/** Contact form beside your contact details. A plain HTML form: works without JavaScript. */
export function Contact({
  title = "Get in touch",
  description,
  action,
  method = "post",
  details = [],
  submitLabel = "Send message",
  className,
  ...props
}: ContactProps) {
  const id = React.useId();
  return (
    <section className={cn("mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2", className)} {...props}>
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-balance">{title}</h2>
        {description && <p className="mt-3 text-pretty text-muted-foreground">{description}</p>}
        {details.length > 0 && (
          <dl className="mt-8 space-y-4">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="text-sm text-muted-foreground">{d.label}</dt>
                <dd className="font-medium">
                  {d.href ? (
                    <a href={d.href} className="underline-offset-4 hover:underline">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <form action={action} method={method} className="space-y-4 rounded-xl border bg-card p-6">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium">
            Name
          </label>
          <input id={`${id}-name`} name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium">
            Email
          </label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-message`} className="text-sm font-medium">
            Message
          </label>
          <textarea id={`${id}-message`} name="message" required rows={5} className={field} />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          {submitLabel}
        </Button>
      </form>
    </section>
  );
}
