"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { Faq, faqSummaryClass, type FaqItem, type FaqProps } from "./faq";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** One question: still a native details element; the answer's height eases open. */
function Question({ item }: { item: FaqItem }) {
  const [open, setOpen] = React.useState(false);
  return (
    <details className="group p-4" onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary className={faqSummaryClass}>
        {item.question}
        <motion.span aria-hidden="true" className="shrink-0" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="size-4" />
        </motion.span>
      </summary>
      {/* Closed details hide this anyway, so the collapsed height never hides readable content. */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0.001 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="mt-2 text-muted-foreground">{item.answer}</p>
      </motion.div>
    </details>
  );
}

/** Faq with motion: answers slide open instead of snapping. */
export function FaqMotion(props: FaqProps) {
  const { title = "Frequently asked questions", items, className, ...rest } = props;
  const reduced = useReducedMotion();
  if (!useMounted() || reduced) return <Faq {...props} />;
  return (
    <section className={cn("mx-auto max-w-2xl px-4 py-12", className)} {...rest}>
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="divide-y rounded-lg border">
        {items.map((item) => (
          <Question key={item.question} item={item} />
        ))}
      </div>
    </section>
  );
}
