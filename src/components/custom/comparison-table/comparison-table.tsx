import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import React from "react";

export interface ComparisonRow {
  feature: string;
  /** One value per plan: true/false for included, or text such as "Unlimited" */
  values: (boolean | string)[];
}

export interface ComparisonTableProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  /** Names the table for screen readers (and is shown as its caption) */
  caption: string;
  plans: string[];
  rows: ComparisonRow[];
  /** Column header over the feature names */
  featureLabel?: string;
}

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <>{value}</>;
  return value ? (
    <>
      <Check aria-hidden="true" className="mx-auto size-4 text-primary" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus aria-hidden="true" className="mx-auto size-4 text-muted-foreground" />
      <span className="sr-only">Not included</span>
    </>
  );
}

/** Feature-by-plan table. On narrow screens it scrolls inside its own box. */
export function ComparisonTable({
  title,
  description,
  caption,
  plans,
  rows,
  featureLabel = "Feature",
  className,
  ...props
}: ComparisonTableProps) {
  return (
    <section className={cn("mx-auto max-w-5xl px-4 py-16", className)} {...props}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      <div
        role="region"
        aria-label={caption}
        tabIndex={0}
        className="relative mt-10 overflow-x-auto rounded-xl border focus-visible:outline-2 focus-visible:outline-ring"
      >
        <table className="w-full min-w-[32rem] text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-muted/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                {featureLabel}
              </th>
              {plans.map((plan) => (
                <th key={plan} scope="col" className="px-4 py-3 text-center font-semibold">
                  {plan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => (
              <tr key={row.feature}>
                <th scope="row" className="px-4 py-3 text-left font-normal">
                  {row.feature}
                </th>
                {row.values.map((value, i) => (
                  <td key={i} className="px-4 py-3 text-center text-muted-foreground">
                    <Cell value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
