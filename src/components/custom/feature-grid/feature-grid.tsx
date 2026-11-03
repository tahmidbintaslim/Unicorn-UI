import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import React from "react";

export interface GridFeature {
  title: string;
  description: string;
  /**
   * A lucide icon component, or a rendered element such as `<Zap />`. Pass an
   * element when a server component renders the motion version: components
   * cannot cross the server/client boundary, elements can.
   */
  icon?: LucideIcon | React.ReactElement;
}

export interface FeatureGridProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  items: GridFeature[];
  /** Columns from the lg breakpoint */
  columns?: 2 | 3 | 4;
}

export const gridCols = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" } as const;

/** One feature: icon, title and text. Shared by the plain and motion versions. */
export function GridFeatureItem({ item }: { item: GridFeature }) {
  const Icon = item.icon;
  return (
    <>
      {Icon && (
        <span aria-hidden="true" className="mb-4 grid size-10 place-items-center rounded-lg bg-primary/10 text-primary [&_svg]:size-5">
          {React.isValidElement(Icon) ? Icon : <Icon className="size-5" />}
        </span>
      )}
      <h3 className="font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </>
  );
}

/** A grid of features with icons. */
export function FeatureGrid({ title, description, items, columns = 3, className, ...props }: FeatureGridProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...props}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      {items.length > 0 && (
        <ul className={cn("mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2", gridCols[columns])}>
          {items.map((item) => (
            <li key={item.title}>
              <GridFeatureItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
