"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import React from "react";
import { useReducedMotionPref } from "./use-reduced-motion";
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
  const reduced = useReducedMotionPref();
  // The first count renders as-is (server and hydration match); a new count pops in.
  const firstCount = React.useRef(count);
  const pop = !reduced && count !== firstCount.current;
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={GITHUB_URL}>
        <Github aria-hidden="true" />
        Star on GitHub
        {count !== null && (
          <span
            key={count}
            className={cn(
              "ml-0.5 rounded-full px-2 py-0.5 font-mono text-[11px] tabular-nums",
              variant === "default" ? "bg-primary-foreground/15" : "bg-muted",
              // Keyed on the count, so a new number remounts and replays the pop.
              pop && "animate-star-pop",
            )}
          >
            {count.toLocaleString("en-US")}
          </span>
        )}
      </a>
    </Button>
  );
}
