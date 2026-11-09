import { Clock, FileText, Globe, Repeat, ShieldCheck, Wallet } from "lucide-react";

/**
 * Every word on the Ledgerline demo lives here. Ledgerline is a fictional
 * product: the people, prices and dates are samples. Change this file and the
 * whole site updates; that's the point of the demo.
 */
export const content = {
  brand: { name: "Ledgerline", href: "/examples/ledgerline" },
  demoNotice: "Ledgerline is a fictional product, built only from Tapas UI sections to show them working.",
  nav: {
    links: [
      { label: "Features", href: "/examples/ledgerline#features" },
      { label: "Pricing", href: "/examples/ledgerline/pricing" },
      { label: "Changelog", href: "/examples/ledgerline/changelog" },
    ],
    action: { label: "Join the waitlist", href: "/examples/ledgerline#join" },
  },
  hero: {
    eyebrow: "Invoicing for freelancers",
    title: "Send the invoice. Get paid. Skip the spreadsheet.",
    description: "Ledgerline turns tracked hours into invoices and chases late payments for you. Launching soon.",
    buttonLabel: "Join the waitlist",
    note: "One email when we launch. No spam.",
  },
  features: {
    title: "Everything between the work and the payment",
    description: "Sample features of a fictional product.",
    items: [
      { title: "Hours to invoice", description: "Pick the tracked hours, Ledgerline writes the invoice.", icon: Clock },
      { title: "Polite reminders", description: "Late invoices get friendly follow-ups on a schedule you set.", icon: Repeat },
      { title: "Any currency", description: "Bill clients abroad and see totals in your own currency.", icon: Globe },
      { title: "Card or bank", description: "Clients pay from the invoice by card or bank transfer.", icon: Wallet },
      { title: "Clean PDFs", description: "Invoices that look like you made them yourself.", icon: FileText },
      { title: "Yours to keep", description: "Export everything as CSV whenever you like.", icon: ShieldCheck },
    ],
  },
  steps: {
    title: "From tracked hours to paid in three steps",
    steps: [
      { title: "Connect your timer", description: "Import hours from the tracker you already use." },
      { title: "Send the invoice", description: "Review the draft and send it in one click." },
      { title: "Get paid", description: "Ledgerline reminds the client until it's settled." },
    ],
  },
  pricing: {
    title: "Simple pricing",
    description: "Sample prices. Checkout runs in Stripe test mode, so nothing is charged.",
    yearlyNote: "2 months free",
    plans: [
      {
        name: "Solo",
        description: "For your first clients",
        monthly: 0,
        yearly: 0,
        features: ["3 clients", "Unlimited invoices", "Email reminders"],
        cta: { label: "Join the waitlist", href: "/examples/ledgerline#join" },
      },
      {
        name: "Pro",
        description: "For a full client list",
        monthly: 12,
        yearly: 120,
        popular: true,
        features: ["Unlimited clients", "Card and bank payments", "Custom reminder schedule"],
        // A Stripe Payment Link: hosted checkout, no server code. Test mode.
        cta: {
          label: "Start Pro (test checkout)",
          href: "https://buy.stripe.com/test_dRmeVc2Kp1gX4vkf2h1ck00",
          yearlyHref: "https://buy.stripe.com/test_dRmbJ0fxb5xd5zo07n1ck01",
        },
      },
    ],
  },
  comparison: {
    title: "Compare plans",
    caption: "Solo and Pro plans compared",
    plans: ["Solo", "Pro"],
    rows: [
      { feature: "Clients", values: ["3", "Unlimited"] },
      { feature: "Invoices", values: ["Unlimited", "Unlimited"] },
      { feature: "Automatic reminders", values: [true, true] },
      { feature: "Card and bank payments", values: [false, true] },
      { feature: "Custom reminder schedule", values: [false, true] },
    ],
  },
  faq: {
    items: [
      { question: "Is Ledgerline real?", answer: "No. It's a sample product that shows Tapas UI sections working together." },
      { question: "Does the waitlist work?", answer: "Yes. The form posts to a route that adds the email to a Resend segment once keys are set." },
      { question: "Does checkout work?", answer: "Yes, in Stripe test mode. Use card 4242 4242 4242 4242 and any future date." },
    ],
  },
  cta: {
    title: "Get paid on time, starting soon",
    description: "Join the waitlist and hear first when Ledgerline launches.",
    actionLabel: "Join the waitlist",
    actionHref: "/examples/ledgerline#join",
  },
  changelog: {
    title: "Changelog",
    entries: [
      { date: "2026-11-01", version: "0.3.0", title: "Bank payments", items: ["Clients can pay by bank transfer", "Faster PDF export"] },
      { date: "2026-10-12", version: "0.2.0", title: "Reminders", items: ["Scheduled reminders for late invoices", "Reminder preview"] },
      { date: "2026-09-20", version: "0.1.0", title: "First beta", items: ["Invoices from tracked hours", "CSV export"] },
    ],
  },
  footer: {
    links: [
      { label: "Pricing", href: "/examples/ledgerline/pricing" },
      { label: "Changelog", href: "/examples/ledgerline/changelog" },
      { label: "Built with Tapas UI", href: "/" },
    ],
    note: "Ledgerline is fictional. Sample content.",
  },
};
