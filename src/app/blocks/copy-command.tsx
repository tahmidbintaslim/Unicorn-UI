"use client";

import { Copy } from "lucide-react";
import toast from "react-hot-toast";

/** Install command with a copy button; the command stays visible and selectable. */
export function CopyCommand({ command }: { command: string }) {
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
      className="flex w-full max-w-full items-center gap-3 rounded-lg border bg-muted px-4 py-3 text-left font-mono text-xs hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-ring sm:text-sm"
    >
      <span className="min-w-0 flex-1 truncate">{command}</span>
      <Copy aria-hidden="true" className="size-4 shrink-0" />
    </button>
  );
}
