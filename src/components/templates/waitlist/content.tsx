/** Every string the waitlist template shows. Edit here, or pass overrides via `content`. All sample copy. */
export const waitlistContent = {
  brand: { name: "Nimbus", href: "/" },
  nav: { links: [{ label: "Features", href: "#features" }, { label: "FAQ", href: "#faq" }], action: { label: "Join", href: "#join" } },
  hero: {
    eyebrow: "Private beta",
    title: "Notes that organize themselves",
    description: "Write anywhere. Nimbus files, links and summarizes it for you. Join the waitlist for early access.",
    action: "#join",
    note: "Sample form: it submits nowhere until you point action at your API.",
  },
  proof: { text: "300 people joined this week (sample)", people: ["Ana", "Ben", "Cy", "Dee", "Eli"] },
  features: {
    title: "Why people are waiting",
    rows: [
      { label: "Capture", title: "Write first, sort later", description: "Notes land in one inbox. Nimbus suggests where they belong." },
      { label: "Connect", title: "Links you didn't have to make", description: "Related notes surface as you type." },
      { label: "Recall", title: "Summaries on demand", description: "Ask a question, get an answer from your own notes." },
    ],
  },
  faq: {
    title: "Questions",
    description: "Anything else? We read every email.",
    contact: { label: "Email the team", href: "mailto:hello@example.com" },
    items: [
      { question: "When does the beta open?", answer: "Invites go out in small batches. Sample answer." },
      { question: "Is it free during beta?", answer: "Yes. Sample answer." },
      { question: "Where is my data stored?", answer: "In your region, encrypted at rest. Sample answer." },
    ],
  },
  footer: {
    note: "© Nimbus. Made-up product for this template.",
    links: [{ label: "Privacy", href: "#privacy" }, { label: "Terms", href: "#terms" }, { label: "Contact", href: "mailto:hello@example.com" }],
  },
};

export type WaitlistContent = typeof waitlistContent;
