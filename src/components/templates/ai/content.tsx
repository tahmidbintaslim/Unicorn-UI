import { Bot, Database, Shield, Sparkles, Timer, Workflow } from "lucide-react";

/** Every string the AI product template shows. Edit here, or pass overrides via `content`. All sample copy. */
export const aiContent = {
  announcement: { message: "New: agents that work while you sleep (sample).", link: { label: "Read the post", href: "#blog" } },
  brand: { name: "Relay AI", href: "/" },
  nav: {
    links: [
      { label: "How it works", href: "#how" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
    ],
    action: { label: "Try it free", href: "#pricing" },
  },
  hero: {
    eyebrow: "AI agents for support teams",
    title: "Answer every ticket in seconds",
    description: "Relay reads your docs, drafts replies and hands off to a human when it isn't sure. Sample copy.",
    primaryAction: { label: "Try it free", href: "#pricing" },
    secondaryAction: { label: "Watch a demo", href: "#how" },
  },
  features: {
    title: "Built for real support queues",
    items: [
      { title: "Grounded answers", description: "Replies cite your own docs.", icon: <Database /> },
      { title: "Knows its limits", description: "Low-confidence tickets go to a person.", icon: <Shield /> },
      { title: "Fast", description: "Drafts in seconds on sample data.", icon: <Timer /> },
      { title: "Workflows", description: "Tag, route and close tickets automatically.", icon: <Workflow /> },
      { title: "Your tone", description: "Learns from replies you approve.", icon: <Sparkles /> },
      { title: "Agent API", description: "Run Relay from your own tools.", icon: <Bot /> },
    ],
  },
  steps: {
    title: "How it works",
    steps: [
      { title: "Connect your docs", description: "Point Relay at your help center." },
      { title: "Review drafts", description: "Approve or edit replies in your inbox." },
      { title: "Turn on autopilot", description: "Let Relay answer what it's sure about." },
    ],
  },
  integrations: {
    title: "Works with your stack",
    items: ["Zendesk", "Intercom", "Slack", "Notion", "Linear", "HubSpot", "Gmail", "Salesforce"].map((name) => ({ name, description: "Sample integration" })),
  },
  comparison: {
    title: "Compare plans",
    caption: "Relay plans compared feature by feature",
    plans: ["Starter", "Growth", "Scale"],
    rows: [
      { feature: "Tickets per month", values: ["500", "5,000", "Unlimited"] },
      { feature: "Autopilot", values: [false, true, true] },
      { feature: "Custom workflows", values: [false, true, true] },
      { feature: "SSO and audit log", values: [false, false, true] },
    ],
  },
  pricing: {
    title: "Pricing",
    description: "Sample prices.",
    yearlyNote: "Save 20%",
    plans: [
      { name: "Starter", monthly: 29, yearly: 278, features: ["500 tickets", "Drafts"], cta: { label: "Start", href: "#start" } },
      { name: "Growth", monthly: 99, yearly: 950, popular: true, features: ["5,000 tickets", "Autopilot", "Workflows"], cta: { label: "Start trial", href: "#start" } },
      { name: "Scale", monthly: 299, yearly: 2870, features: ["Unlimited tickets", "SSO", "Audit log"], cta: { label: "Contact sales", href: "#contact" } },
    ],
  },
  cta: {
    title: "Give your team its evenings back",
    description: "Free for 14 days. No card needed. Sample copy.",
    primaryAction: { label: "Try it free", href: "#start" },
    secondaryAction: { label: "Book a demo", href: "#demo" },
  },
  footer: {
    note: "© Relay AI. Made-up company for this template.",
    columns: [
      { title: "Product", links: [{ label: "How it works", href: "#how" }, { label: "Pricing", href: "#pricing" }] },
      { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Careers", href: "#careers" }] },
    ],
  },
};

export type AiContent = typeof aiContent;
