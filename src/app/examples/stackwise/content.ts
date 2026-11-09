/**
 * Every word on the Stackwise demo lives here. Stackwise is a fictional AI agent:
 * the product, people, numbers and prices are samples. Change this file and the
 * whole site updates.
 */
export const content = {
  brand: { name: "Stackwise", href: "/examples/stackwise" },
  demoNotice: "Stackwise is a fictional AI agent, built only from Tapas UI sections to show them working.",
  nav: {
    links: [
      { label: "Integrations", href: "/examples/stackwise#integrations" },
      { label: "Pricing", href: "/examples/stackwise/pricing" },
      { label: "FAQ", href: "/examples/stackwise#faq" },
    ],
    action: { label: "Join the waitlist", href: "/examples/stackwise#join" },
  },
  hero: {
    eyebrow: "AI dependency agent",
    title: "An AI agent that keeps your dependencies up to date",
    description: "Stackwise reads the changelogs, upgrades your packages, fixes what breaks and opens one pull request you can review. Fictional product.",
    primaryAction: { label: "Join the waitlist", href: "/examples/stackwise#join" },
    secondaryAction: { label: "See pricing", href: "/examples/stackwise/pricing" },
  },
  integrations: {
    title: "Works with the package managers you already use",
    description: "Sample list for a fictional product.",
    items: [
      { name: "npm", description: "package.json and lockfiles" },
      { name: "pnpm", description: "Workspaces included" },
      { name: "PyPI", description: "requirements and pyproject" },
      { name: "Cargo", description: "Crates and workspaces" },
      { name: "Go modules", description: "go.mod and go.sum" },
      { name: "Maven", description: "pom.xml dependencies" },
    ],
  },
  stats: {
    title: "What a quarter could look like",
    description: "Sample numbers for a fictional product, not measurements.",
    stats: [
      { value: 120, label: "Upgrades merged (sample)" },
      { value: 9, label: "Breaking changes fixed (sample)" },
      { value: 4.5, suffix: " h", decimals: 1, label: "Saved per week (sample)" },
    ],
  },
  testimonials: {
    title: "What beta users might say",
    description: "Sample quotes. Stackwise and these people are fictional.",
    items: [
      { quote: "It read the migration guide so I didn't have to.", author: "Mira K.", role: "Platform engineer (sample)" },
      { quote: "One pull request a week instead of forty bot PRs.", author: "Jon P.", role: "Solo founder (sample)" },
      { quote: "The upgrade notes explain why each change was made.", author: "Lea S.", role: "Tech lead (sample)" },
      { quote: "It ran our tests before asking for review.", author: "Omar D.", role: "Backend developer (sample)" },
      { quote: "Majors stopped being a quarterly project.", author: "Ivy T.", role: "Engineering manager (sample)" },
      { quote: "I review the diff, not the release notes.", author: "Sam R.", role: "Indie hacker (sample)" },
    ],
  },
  pricing: {
    title: "Pricing",
    description: "Sample prices. Checkout runs in Stripe test mode, so nothing is charged.",
    yearlyNote: "2 months free",
    plans: [
      {
        name: "Solo",
        description: "For side projects",
        monthly: 0,
        yearly: 0,
        features: ["1 repository", "Weekly upgrade pull request", "Patch and minor updates"],
        cta: { label: "Join the waitlist", href: "/examples/stackwise#join" },
      },
      {
        name: "Team",
        description: "For products with users",
        monthly: 19,
        yearly: 190,
        popular: true,
        features: ["Unlimited repositories", "Major upgrades with code fixes", "Runs your tests first"],
        // Stripe Payment Links (shared with the Patchnote demo): hosted checkout, no server code. Test mode.
        cta: {
          label: "Start Team (test checkout)",
          href: "https://buy.stripe.com/test_28EbJ0ckZ5xd3rgg6l1ck02",
          yearlyHref: "https://buy.stripe.com/test_00weVcbgV3p55zo6vL1ck03",
        },
      },
    ],
  },
  comparison: {
    title: "Compare plans",
    caption: "Solo and Team plans compared",
    plans: ["Solo", "Team"],
    rows: [
      { feature: "Repositories", values: ["1", "Unlimited"] },
      { feature: "Patch and minor updates", values: [true, true] },
      { feature: "Major upgrades with code fixes", values: [false, true] },
      { feature: "Runs your tests before the pull request", values: [false, true] },
      { feature: "Upgrade schedule", values: ["Weekly", "Daily or weekly"] },
    ],
  },
  faq: {
    title: "Questions",
    items: [
      { question: "Is Stackwise real?", answer: "No. It's a sample product that shows Tapas UI sections working together." },
      { question: "Are the numbers and quotes real?", answer: "No. They're labelled samples; nobody has used Stackwise." },
      { question: "Does the waitlist work?", answer: "Yes. The form posts to a route that adds the email to a Resend segment once keys are set." },
      { question: "Does checkout work?", answer: "Yes, in Stripe test mode. Use card 4242 4242 4242 4242 and any future date." },
    ],
  },
  cta: {
    title: "Stop babysitting upgrades",
    description: "Compare the plans, then join the waitlist.",
    actionLabel: "See pricing",
    actionHref: "/examples/stackwise/pricing",
  },
  newsletter: {
    title: "Join the waitlist",
    description: "One email when Stackwise launches. No spam.",
    buttonLabel: "Join the waitlist",
    note: "Demo form. See the status message after you submit.",
  },
  footer: {
    links: [
      { label: "Pricing", href: "/examples/stackwise/pricing" },
      { label: "Patchnote demo", href: "/examples/patchnote" },
      { label: "Built with Tapas UI", href: "/" },
    ],
    note: "Stackwise is fictional. Sample content.",
  },
};
