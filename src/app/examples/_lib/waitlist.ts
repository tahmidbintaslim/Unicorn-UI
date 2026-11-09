// Shared waitlist signup for the demo sites. A plain HTML form posts here, so it works without JavaScript.
// With RESEND_API_KEY and RESEND_AUDIENCE_ID set, the email is added to that Resend audience;
// without them it runs in demo mode and stores nothing.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Handles a waitlist form post, then redirects back to `page` (a fixed site path) with `?joined=<outcome>`. */
export async function handleWaitlist(request: Request, page: string, anchor = "join") {
  // A body that isn't a form (JSON, empty) counts as invalid input, not a server error.
  const form = await request.formData().catch(() => null);
  const email = String(form?.get("email") ?? "").trim().toLowerCase();
  const back = (joined: string) => Response.redirect(new URL(`${page}?joined=${joined}#${anchor}`, request.url), 303);
  // The hidden "website" field is a honeypot: only bots fill it. Look successful, store nothing.
  if (String(form?.get("website") ?? "") !== "") return back("1");
  if (email.length > 254 || !EMAIL.test(email)) return back("invalid");

  const key = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audience) return back("demo");

  const res = await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audience)}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }).catch(() => null);
  return back(res?.ok ? "1" : "error");
}

const MESSAGES: Record<string, string> = {
  "1": "You're on the list. We'll email you once, at launch.",
  demo: "Demo mode: the form works, but no email list is connected, so nothing was stored.",
  invalid: "That email doesn't look right. Please check it and try again.",
  error: "We couldn't add you just now. Please try again in a minute.",
};

/** The status line for a demo page, from its `?joined=` and `?checkout=` values. Unknown values show nothing. */
export function statusMessage({ joined, checkout }: { joined?: string; checkout?: string }) {
  if (checkout === "success") return "Test checkout complete. Nothing was charged.";
  return joined && Object.hasOwn(MESSAGES, joined) ? MESSAGES[joined] : undefined;
}
