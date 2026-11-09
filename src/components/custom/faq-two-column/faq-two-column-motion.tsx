"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import type { FaqTwoColumnProps } from "./faq-two-column";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** One question: still a native details element; once motion is on, the answer's height eases open. */
function Question({ item, on }: { item: FaqTwoColumnProps["items"][number]; on: boolean }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDetailsElement>(null);
  // A visitor may open it before hydration; start from the DOM so motion never collapses an open answer.
  React.useLayoutEffect(() => setOpen(!!ref.current?.open), []);
  return (
    <details ref={ref} className="group p-5" onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        {item.question}
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      {/* Closed details hide this anyway, so the collapsed height never hides readable content. */}
      <motion.div
        initial={false}
        animate={on ? (open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0.001 }) : undefined}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="mt-3 text-muted-foreground">{item.answer}</p>
      </motion.div>
    </details>
  );
}

/**
 * FaqTwoColumn with motion: answers slide open instead of snapping.
 * One tree from server to client: motion switches on after mount, so hydration keeps the server's DOM.
 */
export function FaqTwoColumnMotion({ title = "Frequently asked questions", description, contact, items, className, ...props }: FaqTwoColumnProps) {
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
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
          <Question key={item.question} item={item} on={on} />
        ))}
      </div>
    </section>
  );
}
