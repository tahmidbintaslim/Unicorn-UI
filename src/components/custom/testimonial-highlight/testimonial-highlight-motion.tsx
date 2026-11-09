"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { HighlightCaption, type TestimonialHighlightProps } from "./testimonial-highlight";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * TestimonialHighlight with motion: the quote's words brighten in sequence
 * when it scrolls into view. Screen readers get the quote as one sentence.
 * One tree from server to client: words start lit and only dim-then-brighten after mount.
 */
export function TestimonialHighlightMotion(props: TestimonialHighlightProps) {
  const { quote, author, role, company, avatar, className, ...rest } = props;
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  const words = `“${quote}”`.split(" ");
  return (
    <section className={cn("mx-auto max-w-3xl px-4 py-16 text-center", className)} {...rest}>
      <figure>
        <blockquote className="text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl">
          <span className="sr-only">{quote}</span>
          <motion.span
            aria-hidden="true"
            whileInView={on ? "lit" : undefined}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ staggerChildren: 0.06 }}
          >
            {words.map((w, i) => (
              <React.Fragment key={i}>
                {i > 0 && " "}
                <motion.span
                  variants={{ lit: { opacity: [0.25, 1] } }}
                  transition={{ duration: 0.4 }}
                >
                  {w}
                </motion.span>
              </React.Fragment>
            ))}
          </motion.span>
        </blockquote>
        <HighlightCaption {...{ author, role, company, avatar }} />
      </figure>
    </section>
  );
}
