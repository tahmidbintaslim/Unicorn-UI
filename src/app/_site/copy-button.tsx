"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

/** Copies `text` to the clipboard; the label stays the accessible name, the icon confirms success. */
export function CopyButton({ text, label, className }: { text: string; label: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);
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
            setTimeout(() => setCopied(false), 1500);
          })
          .catch(() => toast.error("Could not copy"));
      }}
    >
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {label}
    </Button>
  );
}
