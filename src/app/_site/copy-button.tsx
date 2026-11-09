"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

/** Copies `text` to the clipboard; the label stays the accessible name, the icon confirms success. */
export function CopyButton({ text, label, className }: { text: string; label: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number>(undefined);
  React.useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      onClick={() => {
        navigator.clipboard
          ?.writeText(text)
          .then(() => {
            setCopied(true);
            toast.success("Copied");
            // Restart the reset on each click, so a quick second copy still shows the check for 1.5s.
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 1500);
          })
          .catch(() => toast.error("Could not copy"));
      }}
    >
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {label}
    </Button>
  );
}
