/** Every string the pricing template shows. Edit here, or pass overrides via `content`. All sample copy. */
export const pricingContent = {
  brand: { name: "Tidy Invoices", href: "/" },
  nav: {
    links: [
      { label: "Plans", href: "#plans" },
      { label: "Compare", href: "#compare" },
      { label: "FAQ", href: "#faq" },
    ],
    action: { label: "Start free", href: "#plans" },
  },
  hero: {
    eyebrow: "Pricing",
    title: "Pricing that grows with you",
    description: "Start free, upgrade when you send more invoices. Sample copy.",
  },
  pricing: {
    title: "Pick a plan",
    description: "Sample prices. Change plans or cancel anytime.",
    yearlyNote: "2 months free",
    plans: [
      { name: "Free", description: "For freelancers", monthly: 0, yearly: 0, features: ["5 invoices a month", "1 user"], cta: { label: "Start free", href: "#start" } },
      { name: "Pro", description: "For small studios", monthly: 15, yearly: 150, popular: true, features: ["Unlimited invoices", "3 users", "Recurring invoices"], cta: { label: "Start trial", href: "#start" } },
      { name: "Business", description: "For finance teams", monthly: 45, yearly: 450, features: ["Unlimited users", "Approvals", "Priority support"], cta: { label: "Contact sales", href: "#contact" } },
    ],
  },
  comparison: {
    title: "Compare plans",
    description: "Every feature, plan by plan. Sample data.",
    caption: "Tidy Invoices plans compared feature by feature",
    plans: ["Free", "Pro", "Business"],
    rows: [
      { feature: "Invoices per month", values: ["5", "Unlimited", "Unlimited"] },
      { feature: "Users", values: ["1", "3", "Unlimited"] },
      { feature: "Recurring invoices", values: [false, true, true] },
      { feature: "Custom branding", values: [false, true, true] },
      { feature: "Approval flows", values: [false, false, true] },
      { feature: "SSO", values: [false, false, true] },
    ],
  },
  faq: {
    title: "Pricing questions",
    items: [
      { question: "Is the free plan really free?", answer: "Yes, for up to five invoices a month. Sample answer." },
      { question: "Can I switch plans later?", answer: "Yes, upgrades and downgrades apply right away. Sample answer." },
      { question: "Do you offer refunds?", answer: "Write to us within 30 days. Sample answer." },
      { question: "Which payment methods do you accept?", answer: "Cards and bank transfer. Sample answer." },
    ],
  },
  cta: { title: "Send your first invoice today", description: "Free plan, no card needed. Sample copy.", actionLabel: "Start free", actionHref: "#start" },
  footer: {
    note: "© Tidy Invoices. Made-up company for this template.",
    columns: [
      { title: "Product", links: [{ label: "Plans", href: "#plans" }, { label: "Compare", href: "#compare" }] },
      { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Contact", href: "#contact" }] },
      { title: "Legal", links: [{ label: "Privacy", href: "#privacy" }, { label: "Terms", href: "#terms" }] },
    ],
  },
};

export type PricingContent = typeof pricingContent;
