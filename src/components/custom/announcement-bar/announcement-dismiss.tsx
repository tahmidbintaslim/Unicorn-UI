"use client";

import { X } from "lucide-react";
import React from "react";

/** The announcement bar's close button: the only part of the bar that needs JavaScript. Hides the bar for this page view. */
export function AnnouncementDismiss() {
  return (
    <button
      type="button"
      aria-label="Dismiss announcement"
      onClick={(e) => {
        const bar = e.currentTarget.closest<HTMLElement>('[data-slot="announcement"]');
        if (bar) bar.hidden = true;
      }}
      className="absolute right-2 grid size-7 place-items-center rounded-md hover:bg-primary-foreground/15 focus-visible:outline-2 focus-visible:outline-primary-foreground"
    >
      <X aria-hidden="true" className="size-4" />
    </button>
  );
}
