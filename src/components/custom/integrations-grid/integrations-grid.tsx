import { cn } from "@/lib/utils";
import React from "react";

export interface Integration {
  name: string;
  description?: string;
  /** Logo element; the first letter is shown without one */
  logo?: React.ReactNode;
  href?: string;
}

export interface IntegrationsGridProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  items: Integration[];
}

export const tileClass =
  "flex h-full items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-ring";

/** One tile's content. Shared by the plain and motion versions. */
export function IntegrationTile({ item }: { item: Integration }) {
  return (
    <>
      <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted font-semibold">
        {item.logo ?? item.name.charAt(0)}
      </span>
      <span className="min-w-0">
        <span className="block font-medium">{item.name}</span>
        {item.description && <span className="block truncate text-sm text-muted-foreground">{item.description}</span>}
      </span>
    </>
  );
}

/** A grid of integrations or tools, each optionally linking to its page. */
export function IntegrationsGrid({ title, description, items, className, ...props }: IntegrationsGridProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...props}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      {items.length > 0 && (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.name}>
              {item.href ? (
                <a href={item.href} className={tileClass}>
                  <IntegrationTile item={item} />
                </a>
              ) : (
                <div className={tileClass}>
                  <IntegrationTile item={item} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
