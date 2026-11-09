"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { ProofAvatar, ProofRating, type SocialProofProps } from "./social-proof";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** SocialProof with motion: avatars pop in one after another when the row comes into view. */
export function SocialProofMotion(props: SocialProofProps) {
  const { text, people, rating, className, ...rest } = props;
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  return (
    <div className={cn("flex flex-col items-center gap-3 sm:flex-row sm:justify-center", className)} {...rest}>
      {people.length > 0 && (
        <div className="flex -space-x-2">
          {people.map((p, i) => (
            <motion.span
              key={p.name}
              className="inline-block"
              whileInView={on ? { scale: [0.6, 1], opacity: [0.4, 1] } : undefined}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 18, delay: i * 0.07 }}
            >
              <ProofAvatar person={p} />
            </motion.span>
          ))}
        </div>
      )}
      <div className="flex flex-col items-center gap-1 sm:items-start">
        {rating !== undefined && <ProofRating rating={rating} />}
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
