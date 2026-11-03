import { cn } from "@/lib/utils";
import React from "react";

export interface WallTestimonial {
  quote: string;
  author: string;
  role?: string;
  /** Image URL; initials are shown without one */
  avatar?: string;
}

export interface TestimonialsWallProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  items: WallTestimonial[];
}

/** One quote card. Shared by the plain and motion versions. */
export function WallCard({ item }: { item: WallTestimonial }) {
  return (
    <figure className="mb-6 break-inside-avoid rounded-xl border bg-card p-5 text-left shadow-sm">
      <blockquote className="text-sm leading-relaxed">“{item.quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        {item.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the section framework-agnostic
          <img src={item.avatar} alt="" className="size-8 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-muted text-xs font-semibold">
            {item.author.charAt(0)}
          </span>
        )}
        <span className="text-sm">
          <span className="block font-medium">{item.author}</span>
          {item.role && <span className="block text-muted-foreground">{item.role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

/** A masonry wall of short testimonials. */
export function TestimonialsWall({ title, description, items, className, ...props }: TestimonialsWallProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...props}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      {items.length > 0 && (
        <div className="mt-10 gap-6 sm:columns-2 lg:columns-3">
          {items.map((item) => (
            <WallCard key={item.author + item.quote} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
