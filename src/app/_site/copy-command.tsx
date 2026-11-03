"use client";

import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

/** Install command with a copy button; the command stays visible and selectable. */
export function CopyCommand({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard
          ?.writeText(command)
          .then(() => toast.success("Copied"))
          .catch(() => toast.error("Could not copy"));
      }}
      aria-label={`Copy install command: ${command}`}
      className={cn(
        "group flex w-full max-w-full items-center gap-3 rounded-lg border bg-card px-4 py-3 text-left font-mono text-xs transition-colors hover:border-brand/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-sm",
        className,
      )}
    >
      <span aria-hidden="true" className="text-muted-foreground">
        $
      </span>
      <span className="min-w-0 flex-1 truncate">{command}</span>
      <Copy
        aria-hidden="true"
        className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
      />
    </button>
  );
}
