"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { ProofAvatar, ProofRating, SocialProof, type SocialProofProps } from "./social-proof";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** SocialProof with motion: avatars pop in one after another when the row comes into view. */
export function SocialProofMotion(props: SocialProofProps) {
  const { text, people, rating, className, ...rest } = props;
  const reduced = useReducedMotion();
  if (!useMounted() || reduced) return <SocialProof {...props} />;
  return (
    <div className={cn("flex flex-col items-center gap-3 sm:flex-row sm:justify-center", className)} {...rest}>
      {people.length > 0 && (
        <motion.div className="flex -space-x-2" initial="out" whileInView="in" viewport={{ once: true }} transition={{ staggerChildren: 0.07 }}>
          {people.map((p) => (
            <motion.span
              key={p.name}
              className="inline-block"
              variants={{ out: { scale: 0.6, opacity: 0.4 }, in: { scale: 1, opacity: 1 } }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <ProofAvatar person={p} />
            </motion.span>
          ))}
        </motion.div>
      )}
      <div className="flex flex-col items-center gap-1 sm:items-start">
        {rating !== undefined && <ProofRating rating={rating} />}
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
