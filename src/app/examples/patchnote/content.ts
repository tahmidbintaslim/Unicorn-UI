/**
 * Every word on the Patchnote demo lives here. Patchnote is a fictional AI tool:
 * the product, prices and commands are samples. Change this file and the whole
 * site updates.
 */
export const content = {
  brand: { name: "Patchnote", href: "/examples/patchnote" },
  demoNotice: "Patchnote is a fictional AI tool, built only from Tapas UI motion sections.",
  nav: {
    links: [
      { label: "Features", href: "/examples/patchnote#features" },
      { label: "Pricing", href: "/examples/patchnote#pricing" },
      { label: "FAQ", href: "/examples/patchnote#faq" },
    ],
    action: { label: "Join the beta", href: "/examples/patchnote#join" },
  },
  hero: {
    eyebrow: "AI release notes",
    title: "Release notes that write themselves from your git log",
    description: "Patchnote reads merged pull requests and drafts notes your users can actually follow. Fictional product, sample command.",
    // A sample command for a fictional CLI. It isn't published anywhere.
    command: "patchnote draft --since v1.4.0",
    primaryAction: { label: "Join the beta", href: "/examples/patchnote#join" },
  },
  features: {
    title: "From merged code to a changelog people read",
    items: [
      { title: "Reads your pull requests", description: "Titles, descriptions and labels become plain-language notes.", icon: "git", size: "wide" },
      { title: "Your voice", description: "Give it two old releases and it matches the tone.", icon: "pen" },
      { title: "Groups the noise", description: "Dependency bumps and chores fold into one line.", icon: "layers" },
      { title: "Review before publish", description: "Every draft waits for a human to approve it.", icon: "check", size: "wide" },
    ],
  },
  rows: {
    title: "How a release goes",
    rows: [
      { label: "Draft", title: "One command after you tag", description: "Patchnote collects what changed since the last tag and writes a first draft." },
      { label: "Publish", title: "Paste it anywhere", description: "Markdown out, so it fits your docs, GitHub releases or an email." },
    ],
  },
  pricing: {
    title: "Pricing",
    description: "Sample prices. Checkout runs in Stripe test mode, so nothing is charged.",
    yearlyNote: "2 months free",
    plans: [
      {
        name: "Hobby",
        description: "For side projects",
        monthly: 0,
        yearly: 0,
        features: ["1 repository", "10 drafts a month", "Markdown export"],
        cta: { label: "Join the beta", href: "/examples/patchnote#join" },
      },
      {
        name: "Team",
        description: "For products with users",
        monthly: 19,
        yearly: 190,
        popular: true,
        features: ["Unlimited repositories", "Unlimited drafts", "Tone matching"],
        // Stripe Payment Links: hosted checkout, no server code. Test mode.
        cta: {
          label: "Start Team (test checkout)",
          href: "https://buy.stripe.com/test_28EbJ0ckZ5xd3rgg6l1ck02",
          yearlyHref: "https://buy.stripe.com/test_00weVcbgV3p55zo6vL1ck03",
        },
      },
    ],
  },
  faq: {
    title: "Questions",
    items: [
      { question: "Is Patchnote real?", answer: "No. It's a sample product that shows Tapas UI motion sections working together." },
      { question: "Does the beta form work?", answer: "Yes. It posts to a route that adds the email to a Resend segment once keys are set." },
      { question: "Does checkout work?", answer: "Yes, in Stripe test mode. Use card 4242 4242 4242 4242 and any future date." },
      { question: "Can I run the command?", answer: "No. Patchnote isn't published; the command is sample text." },
    ],
  },
  newsletter: {
    title: "Join the beta",
    description: "One email when the beta opens. No spam.",
    buttonLabel: "Join the beta",
    note: "Demo form. See the status message after you submit.",
  },
  footer: {
    links: [
      { label: "Pricing", href: "/examples/patchnote#pricing" },
      { label: "Ledgerline demo", href: "/examples/ledgerline" },
      { label: "Built with Tapas UI", href: "/" },
    ],
    note: "Patchnote is fictional. Sample content.",
  },
};
