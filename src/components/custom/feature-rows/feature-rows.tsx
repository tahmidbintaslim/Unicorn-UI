import { cn } from "@/lib/utils";
import React from "react";

export interface FeatureRow {
  title: string;
  description: string;
  /** Image or component for this row */
  media: React.ReactNode;
  /** Small label above the title, such as the feature's name */
  label?: string;
}

export interface FeatureRowsProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  rows: FeatureRow[];
}

/** Copy half of a row. Shared by the plain and motion versions. */
export function RowCopy({ row }: { row: FeatureRow }) {
  return (
    <div>
      {row.label && <p className="text-sm font-medium text-primary">{row.label}</p>}
      <h3 className="mt-2 text-2xl font-bold tracking-tight text-balance">{row.title}</h3>
      <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">{row.description}</p>
    </div>
  );
}

/** Feature rows with media, alternating sides. Phones stack copy first. */
export function FeatureRows({ title, description, rows, className, ...props }: FeatureRowsProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...props}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      <div className="mt-12 space-y-20">
        {rows.map((row, i) => (
          <div key={row.title} className="grid items-center gap-10 lg:grid-cols-2">
            <RowCopy row={row} />
            <div data-slot="row-media" className={cn("min-w-0", i % 2 === 1 && "lg:order-first")}>
              {row.media}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
