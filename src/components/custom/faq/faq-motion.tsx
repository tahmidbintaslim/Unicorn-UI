"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { faqSummaryClass, type FaqItem, type FaqProps } from "./faq";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** One question: still a native details element; once motion is on, the answer's height eases open. */
function Question({ item, on }: { item: FaqItem; on: boolean }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDetailsElement>(null);
  // A visitor may open it before hydration; start from the DOM so motion never collapses an open answer.
  React.useLayoutEffect(() => setOpen(!!ref.current?.open), []);
  return (
    <details ref={ref} className="group p-4" onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary className={faqSummaryClass}>
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
        <p className="mt-2 text-muted-foreground">{item.answer}</p>
      </motion.div>
    </details>
  );
}

/**
 * Faq with motion: answers slide open instead of snapping.
 * One tree from server to client: motion switches on after mount, so hydration keeps the server's DOM.
 */
export function FaqMotion(props: FaqProps) {
  const { title = "Frequently asked questions", items, className, ...rest } = props;
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  return (
    <section className={cn("mx-auto max-w-2xl px-4 py-12", className)} {...rest}>
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="divide-y rounded-lg border">
        {items.map((item) => (
          <Question key={item.question} item={item} on={on} />
        ))}
      </div>
    </section>
  );
}
