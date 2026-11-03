"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { GITHUB_URL } from "./links";

/** "Star on GitHub" link with the live star count, which pops in when it changes. */
export function StarButton({
  count,
  size = "sm",
  variant = "outline",
  className,
}: {
  count: number | null;
  size?: "sm" | "lg";
  variant?: "outline" | "default";
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={GITHUB_URL}>
        <Github aria-hidden="true" />
        Star on GitHub
        {count !== null && (
          <motion.span
            key={count}
            aria-label={`${count.toLocaleString("en-US")} stars`}
            className={cn(
              "ml-0.5 rounded-full px-2 py-0.5 font-mono text-[11px] tabular-nums",
              variant === "default" ? "bg-primary-foreground/15" : "bg-muted",
            )}
            initial={reduced ? false : { scale: 0.6, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
          >
            {count.toLocaleString("en-US")}
          </motion.span>
        )}
      </a>
    </Button>
  );
}
