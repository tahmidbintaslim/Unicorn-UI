import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import React from "react";
import { AnnouncementDismiss } from "./announcement-dismiss";

export interface AnnouncementBarProps extends React.ComponentProps<"div"> {
  message: string;
  link?: { label: string; href: string };
  /** Show a close button. Dismissal lasts for the page view. */
  dismissible?: boolean;
}

/** A slim bar above the navbar for one announcement. Renders on the server; only the optional close button is a client component. */
export function AnnouncementBar({ message, link, dismissible = false, className, ...props }: AnnouncementBarProps) {
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
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </a>
      )}
      {dismissible && <AnnouncementDismiss />}
    </div>
  );
}
