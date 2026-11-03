import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

export interface FaqTwoColumnProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  /** Where to go for anything the FAQ doesn't answer */
  contact?: { label: string; href: string };
  items: { question: string; answer: string }[];
}

/** FAQ with an intro column beside the questions. Native details/summary, no JavaScript. */
export function FaqTwoColumn({ title = "Frequently asked questions", description, contact, items, className, ...props }: FaqTwoColumnProps) {
  return (
    <section className={cn("mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1fr_2fr]", className)} {...props}>
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-balance">{title}</h2>
        {description && <p className="mt-3 text-pretty text-muted-foreground">{description}</p>}
        {contact && (
          <a href={contact.href} className="mt-4 inline-block font-medium text-primary underline-offset-4 hover:underline">
            {contact.label}
          </a>
        )}
      </div>
      <div className="divide-y rounded-xl border">
        {items.map((item) => (
          <details key={item.question} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown aria-hidden="true" className="size-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
