import { Accessibility, Gauge, LineChart, Lock, Plug, Zap } from "lucide-react";

/** Every string the SaaS template shows. Edit here, or pass overrides via `content`. All sample copy. */
export const saasContent = {
  brand: { name: "Acme Analytics", href: "/" },
  nav: {
    links: [
      { label: "Product", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    action: { label: "Start free", href: "#pricing" },
  },
  hero: {
    eyebrow: "New: usage by feature",
    title: "Know which features your users love",
    description: "Product analytics without the setup. Drop in one script and see usage by feature in minutes.",
    primaryAction: { label: "Start free", href: "#pricing" },
    secondaryAction: { label: "See how it works", href: "#features" },
  },
  logos: { title: "Trusted by teams at", names: ["Northwind", "Globex", "Initech", "Umbrella", "Hooli"] },
  features: {
    title: "Everything you need to understand usage",
    description: "No tracking plan, no dashboards to build first.",
    items: [
      { title: "One script", description: "Install in minutes, no tracking plan needed.", icon: <Zap /> },
      { title: "Feature reports", description: "See which features people come back to.", icon: <LineChart /> },
      { title: "Fast", description: "Queries return in under a second on sample data.", icon: <Gauge /> },
      { title: "Private by default", description: "No cookies and no personal data stored.", icon: <Lock /> },
      { title: "Integrations", description: "Send insights to Slack and your warehouse.", icon: <Plug /> },
      { title: "Accessible", description: "Charts with text alternatives and keyboard support.", icon: <Accessibility /> },
    ],
  },
  stats: {
    title: "Sample numbers",
    stats: [
      { value: 12000, label: "Teams (sample)", suffix: "+" },
      { value: 99.9, label: "Uptime (sample)", suffix: "%", decimals: 1 },
      { value: 4, label: "Minutes to set up (sample)" },
    ],
  },
  testimonials: {
    title: "What customers say",
    description: "Sample quotes.",
    items: [
      { quote: "We found our stickiest feature in a day.", author: "Maya R.", role: "Founder" },
      { quote: "Setup took less time than the meeting about it.", author: "Leo K.", role: "Engineer" },
      { quote: "Finally a report the whole team reads.", author: "Priya S.", role: "PM" },
      { quote: "Clear, fast and private. Exactly what we wanted.", author: "Tom W.", role: "CTO" },
      { quote: "The feature report changed our roadmap.", author: "Ana P.", role: "Head of Product" },
      { quote: "Our board deck builds itself now.", author: "Chris D.", role: "CEO" },
    ],
  },
  pricing: {
    title: "Simple pricing",
    description: "Sample prices. Start free, upgrade when you grow.",
    yearlyNote: "2 months free",
    plans: [
      { name: "Hobby", description: "For side projects", monthly: 0, yearly: 0, features: ["1 project", "7-day history"], cta: { label: "Start free", href: "#start" } },
      { name: "Pro", description: "For growing products", monthly: 19, yearly: 190, popular: true, features: ["10 projects", "Feature reports", "1-year history"], cta: { label: "Start trial", href: "#start" } },
      { name: "Team", description: "For companies", monthly: 49, yearly: 490, features: ["Unlimited projects", "SSO", "Priority support"], cta: { label: "Contact sales", href: "#contact" } },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      { question: "Is there a free plan?", answer: "Yes. Hobby is free for one project." },
      { question: "Do you use cookies?", answer: "No. Sample answer." },
      { question: "Can I cancel anytime?", answer: "Yes, from your billing page." },
    ],
  },
  cta: { title: "Start measuring today", description: "Free for your first project.", actionLabel: "Start free", actionHref: "#start" },
  footer: {
    note: "© Acme Analytics. Made-up company for this template.",
    columns: [
      { title: "Product", links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }] },
      { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Blog", href: "#blog" }] },
      { title: "Legal", links: [{ label: "Privacy", href: "#privacy" }, { label: "Terms", href: "#terms" }] },
    ],
  },
};

export type SaasContent = typeof saasContent;
