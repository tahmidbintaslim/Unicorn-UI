import { cn } from "@/lib/utils";
import React from "react";

export interface TestimonialHighlightProps extends Omit<React.ComponentProps<"section">, "children"> {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  /** Image URL; initials are shown without one */
  avatar?: string;
}

/** Caption shared by the plain and motion versions. */
export function HighlightCaption({ author, role, company, avatar }: Pick<TestimonialHighlightProps, "author" | "role" | "company" | "avatar">) {
  return (
    <figcaption className="mt-8 flex items-center justify-center gap-3">
      {avatar ? (
        // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the section framework-agnostic
        <img src={avatar} alt="" className="size-11 rounded-full object-cover" />
      ) : (
        <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-muted font-semibold">
          {author.charAt(0)}
        </span>
      )}
      <span className="text-left text-sm">
        <span className="block font-semibold">{author}</span>
        {(role || company) && <span className="block text-muted-foreground">{[role, company].filter(Boolean).join(", ")}</span>}
      </span>
    </figcaption>
  );
}

/** One large quote, centered, for a single strong testimonial. */
export function TestimonialHighlight({ quote, author, role, company, avatar, className, ...props }: TestimonialHighlightProps) {
  return (
    <section className={cn("mx-auto max-w-3xl px-4 py-16 text-center", className)} {...props}>
      <figure>
        <blockquote className="text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl">“{quote}”</blockquote>
        <HighlightCaption {...{ author, role, company, avatar }} />
      </figure>
    </section>
  );
}
