"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import type { AnnouncementBarProps } from "./announcement-bar";
import { AnnouncementDismiss } from "./announcement-dismiss";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/**
 * AnnouncementBar with motion: the link's arrow nudges twice once the page loads, then stays still.
 * One tree from server to client: motion switches on after mount, so hydration keeps the server's DOM.
 */
export function AnnouncementBarMotion({ message, link, dismissible = false, className, ...props }: AnnouncementBarProps) {
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  return (
    <div
      data-slot="announcement"
      className={cn("relative flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 bg-primary px-10 py-2 text-center text-sm text-primary-foreground", className)}
      {...props}
    >
      <span>{message}</span>
      {link && (
        <a href={link.href} className="inline-flex items-center gap-1 font-semibold whitespace-nowrap underline-offset-4 hover:underline">
          {link.label}
          {/* One short nudge (about a second), so no pause control is needed. */}
          <motion.span
            className="inline-flex"
            animate={on ? { x: [0, 4, 0, 4, 0] } : undefined}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
          >
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </motion.span>
        </a>
      )}
      {dismissible && <AnnouncementDismiss />}
    </div>
  );
}
