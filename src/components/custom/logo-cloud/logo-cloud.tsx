import { cn } from "@/lib/utils";
import React from "react";

export interface LogoCloudItem {
  /** Company name; read by screen readers even when `logo` is an image or icon */
  name: string;
  /** Optional logo; the name is shown as text when omitted */
  logo?: React.ReactNode;
}

export interface LogoCloudProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  logos: LogoCloudItem[];
}

/** "Trusted by" strip: a list of logos, or plain company names when no logo is given. */
export function LogoCloud({ title = "Trusted by teams at", logos, className, ...props }: LogoCloudProps) {
  return (
    <section className={cn("mx-auto max-w-4xl px-4 py-12 text-center", className)} {...props}>
      <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{title}</h2>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {logos.map(({ name, logo }) => (
          <li key={name} className="text-lg font-semibold text-muted-foreground">
            {logo ? (
              <>
                <span aria-hidden="true">{logo}</span>
                <span className="sr-only">{name}</span>
              </>
            ) : (
              name
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
