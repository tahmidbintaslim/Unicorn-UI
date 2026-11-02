import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  items: FaqItem[];
}

/** FAQ list built on native details/summary, so it works without JavaScript. */
export function Faq({ title = "Frequently asked questions", items, className, ...props }: FaqProps) {
  return (
    <section className={cn("mx-auto max-w-2xl px-4 py-12", className)} {...props}>
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="divide-y rounded-lg border">
        {items.map((item) => (
          <details key={item.question} className="group p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium focus-visible:outline-2 focus-visible:outline-ring">
              {item.question}
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-2 text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
