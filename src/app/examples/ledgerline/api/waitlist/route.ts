// Waitlist signup for the Ledgerline demo. A plain HTML form posts here, so it works without JavaScript.
// With RESEND_API_KEY and RESEND_AUDIENCE_ID set, the email is added to that Resend audience;
// without them it runs in demo mode and stores nothing.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // A body that isn't a form (JSON, empty) counts as invalid input, not a server error.
  const form = await request.formData().catch(() => null);
  const email = String(form?.get("email") ?? "").trim().toLowerCase();
  const back = (joined: string) => Response.redirect(new URL(`/examples/ledgerline?joined=${joined}#join`, request.url), 303);
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
