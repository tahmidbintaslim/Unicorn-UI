"use client";

import { useSearchParams } from "next/navigation";

const MESSAGES: Record<string, string> = {
  "1": "You're on the list. We'll email you once, at launch.",
  demo: "Demo mode: the form works, but no email list is connected, so nothing was stored.",
  invalid: "That email doesn't look right. Please check it and try again.",
  error: "We couldn't add you just now. Please try again in a minute.",
};

/** The status line for a demo page, from its `?joined=` and `?checkout=` values. Unknown values show nothing. */
export function statusMessage(joined: string | null, checkout: string | null) {
  if (checkout === "success") return "Test checkout complete. Nothing was charged.";
  return joined && Object.hasOwn(MESSAGES, joined) ? MESSAGES[joined] : undefined;
}

/**
 * Reads the query string in the browser, so the demo page itself stays static.
 * Render it inside <Suspense>.
 */
export function StatusLine({ className }: { className?: string }) {
  const params = useSearchParams();
  const message = statusMessage(params.get("joined"), params.get("checkout"));
  if (!message) return null;
  return (
    <p role="status" className={className}>
      {message}
    </p>
  );
}
