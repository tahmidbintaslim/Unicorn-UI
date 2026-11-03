import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import React from "react";

export interface BentoItem {
  title: string;
  description: string;
  icon?: LucideIcon;
  /** How many grid cells the tile spans on medium screens and up */
  size?: "default" | "wide" | "tall" | "large";
}

export interface BentoGridProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  items: BentoItem[];
}

const sizeClass: Record<NonNullable<BentoItem["size"]>, string> = {
  default: "",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  large: "md:col-span-2 md:row-span-2",
};

/** Feature grid with tiles of mixed sizes. Tiles stack in one column on phones. */
export function BentoGrid({ title, items, className, ...props }: BentoGridProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-12", className)} {...props}>
      {title && <h2 className="mb-8 text-center text-3xl font-bold">{title}</h2>}
      <ul className="grid auto-rows-[minmax(10rem,auto)] grid-cols-1 gap-4 md:grid-cols-3">
        {items.map(({ title: itemTitle, description, icon: Icon, size = "default" }) => (
          <li
            key={itemTitle}
            className={cn(
              "flex flex-col justify-end rounded-xl border bg-card p-6 text-card-foreground",
              sizeClass[size],
            )}
          >
            {Icon && <Icon aria-hidden="true" className="mb-auto size-6 text-primary" />}
            <h3 className="mt-6 font-semibold">{itemTitle}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
