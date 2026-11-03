"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";
import React from "react";

export interface AnnouncementBarProps extends React.ComponentProps<"div"> {
  message: string;
  link?: { label: string; href: string };
  /** Show a close button. Dismissal lasts for the page view. */
  dismissible?: boolean;
}

/** A slim bar above the navbar for one announcement. */
export function AnnouncementBar({ message, link, dismissible = false, className, ...props }: AnnouncementBarProps) {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;
  return (
    <div
      data-slot="announcement"
      className={cn("relative flex items-center justify-center gap-2 bg-primary px-10 py-2 text-center text-sm text-primary-foreground", className)}
      {...props}
    >
      <span>{message}</span>
      {link && (
        <a href={link.href} className="inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline">
          {link.label}
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </a>
      )}
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setOpen(false)}
          className="absolute right-2 grid size-7 place-items-center rounded-md hover:bg-primary-foreground/15 focus-visible:outline-2 focus-visible:outline-primary-foreground"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      )}
    </div>
  );
}
