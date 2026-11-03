import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import React from "react";

export interface BentoItem {
  title: string;
  description: string;
  /** A lucide icon component, or a rendered element such as `<Zap />` (needed when a server page renders the motion version). */
  icon?: LucideIcon | React.ReactElement;
  /** How many grid cells the tile spans on medium screens and up */
  size?: "default" | "wide" | "tall" | "large";
}

export interface BentoGridProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  items: BentoItem[];
}

export const bentoSizeClass: Record<NonNullable<BentoItem["size"]>, string> = {
  default: "",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  large: "md:col-span-2 md:row-span-2",
};

const isComponent = (icon: unknown): icon is LucideIcon =>
  typeof icon === "function" || (typeof icon === "object" && icon !== null && "render" in icon);

export const bentoTileClass = "flex flex-col justify-end rounded-xl border bg-card p-6 text-card-foreground";

/** A tile's icon, title and text. Shared by the plain and motion versions. */
export function BentoTileBody({ item }: { item: BentoItem }) {
  const Icon = item.icon;
  return (
    <>
      {Icon && (
        <span aria-hidden="true" className="mb-auto text-primary [&_svg]:size-6">
          {isComponent(Icon) ? <Icon className="size-6" /> : Icon}
        </span>
      )}
      <h3 className="mt-6 font-semibold">{item.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
    </>
  );
}

/** Feature grid with tiles of mixed sizes. Tiles stack in one column on phones. */
export function BentoGrid({ title, items, className, ...props }: BentoGridProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-12", className)} {...props}>
      {title && <h2 className="mb-8 text-center text-3xl font-bold">{title}</h2>}
      <ul className="grid auto-rows-[minmax(10rem,auto)] grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className={cn(bentoTileClass, bentoSizeClass[item.size ?? "default"])}>
            <BentoTileBody item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
