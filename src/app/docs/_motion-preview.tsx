"use client";

import { RotateCcw } from "lucide-react";
import React from "react";

/**
 * Wraps a docs motion preview. The preview mounts while hidden behind the
 * Plain/Motion switch, so its entrance would already be over; this remounts
 * it when Motion is chosen, and offers a Replay button.
 */
export function MotionPreview({ children }: { children: React.ReactNode }) {
  const [run, setRun] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scope = ref.current?.closest(".variant-scope");
    if (!scope) return;
    const onChange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      if (input.type === "radio" && input.value === "motion" && input.checked) setRun((r) => r + 1);
    };
    scope.addEventListener("change", onChange);
    return () => scope.removeEventListener("change", onChange);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-md border bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur hover:bg-muted focus-visible:outline-2 focus-visible:outline-brand"
      >
        <RotateCcw aria-hidden="true" className="size-3.5" />
        Replay animation
      </button>
      <div key={run} data-replay={run}>
        {children}
      </div>
    </div>
  );
}
