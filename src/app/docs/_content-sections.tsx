import { ComparisonTable } from "@/components/custom/comparison-table";
import { FeatureGrid, FeatureGridMotion } from "@/components/custom/feature-grid";
import { FeatureRows, FeatureRowsMotion } from "@/components/custom/feature-rows";
import { IntegrationsGrid, IntegrationsGridMotion } from "@/components/custom/integrations-grid";
import { Steps, StepsMotion } from "@/components/custom/steps";
import { Accessibility, Moon, Palette, Server, Terminal, Zap } from "lucide-react";
import { CtaSplit, CtaSplitMotion } from "@/components/custom/cta-split";
import { Newsletter, NewsletterMotion } from "@/components/custom/newsletter";
import { PricingTable, PricingTableMotion } from "@/components/custom/pricing-table";
import { SocialProof, SocialProofMotion } from "@/components/custom/social-proof";
import { StatsBand, StatsBandMotion } from "@/components/custom/stats-band";
import { TestimonialHighlight, TestimonialHighlightMotion } from "@/components/custom/testimonial-highlight";
import { TestimonialsWall, TestimonialsWallMotion } from "@/components/custom/testimonials-wall";
import type { PropDoc, SectionDoc } from "./_content";
import { DemoScreen } from "./_content-heroes";

const ROOT: PropDoc = {
  name: "...props",
  type: `React.ComponentProps<"section">`,
  description: "Any other section attribute (id, aria-*, data-*, ref) goes to the root element.",
};

export const samplePlans = [
  { name: "Hobby", description: "For side projects", monthly: 0, yearly: 0, features: ["1 project", "Community support"], cta: { label: "Start free", href: "#start" } },
  { name: "Pro", description: "For growing products", monthly: 19, yearly: 190, popular: true, features: ["10 projects", "Feature reports", "Email support"], cta: { label: "Start trial", href: "#trial" } },
  { name: "Team", description: "For companies", monthly: 49, yearly: 490, features: ["Unlimited projects", "SSO", "Priority support"], cta: { label: "Contact sales", href: "#sales" } },
];

const comparison = {
  title: "Compare plans",
  caption: "Plans compared feature by feature",
  plans: ["Hobby", "Pro", "Team"],
  rows: [
    { feature: "Projects", values: ["1", "10", "Unlimited"] },
    { feature: "Feature reports", values: [false, true, true] },
    { feature: "Single sign-on", values: [false, false, true] },
    { feature: "Support", values: ["Community", "Email", "Priority"] },
  ],
};

const cta = {
  title: "Ready to see your own usage?",
  description: "Start free and send your first event in five minutes. Sample copy.",
  primaryAction: { label: "Start free", href: "#start" },
  secondaryAction: { label: "Talk to us", href: "#contact" },
};

const newsletter = {
  title: "One email a month",
  description: "New sections and templates, nothing else. Sample copy.",
  action: "#subscribe",
  note: "Unsubscribe anytime.",
};

export const sampleQuotes = [
  { quote: "We replaced a week of landing-page work with an afternoon.", author: "Maya R.", role: "Founder" },
  { quote: "The sections picked up our theme the moment we installed them.", author: "Leo K.", role: "Frontend lead" },
  { quote: "Readable code we could change. That's the whole point.", author: "Priya S.", role: "Indie hacker" },
  { quote: "Pricing and FAQ in ten minutes, accessible out of the box.", author: "Tom W.", role: "Designer" },
  { quote: "Plain versions for the server, motion where we wanted it.", author: "Ana P.", role: "Engineer" },
  { quote: "Our launch page finally looks like the product.", author: "Chris D.", role: "Founder" },
];

// Made-up numbers for previews; replace with your own.
const sampleStats = [
  { value: 12000, label: "Sample installs", suffix: "+" },
  { value: 99.9, label: "Sample uptime", suffix: "%", decimals: 1 },
  { value: 48, label: "Sample countries" },
  { value: 4.8, label: "Sample rating", decimals: 1 },
];

export const sampleFeatures = [
  { title: "One command", description: "Install any section with the shadcn CLI.", icon: Terminal },
  { title: "Your theme", description: "Sections read your shadcn tokens.", icon: Palette },
  { title: "Server-first", description: "Plain sections render as server components.", icon: Server },
  { title: "Accessible", description: "Semantic HTML and keyboard support.", icon: Accessibility },
  { title: "Light and dark", description: "Every section works in both themes.", icon: Moon },
  { title: "Optional motion", description: "Add the motion version where it helps.", icon: Zap },
];

export const sampleSteps = [
  { title: "Pick a section", description: "Browse previews in your colors." },
  { title: "Run one command", description: "The shadcn CLI copies the code into your project." },
  { title: "Make it yours", description: "Edit it like any other file, then ship." },
];

export const sampleIntegrations = ["Stripe", "Slack", "GitHub", "Linear", "Notion", "Vercel", "Supabase", "Resend"].map((name) => ({
  name,
  description: "Sample integration",
}));

export const SECTION_DOCS: Record<string, SectionDoc> = {
  "pricing-table": {
    preview: <PricingTable title="Simple pricing" description="Sample prices." plans={samplePlans} yearlyNote="2 months free" />,
    importLine: `import { PricingTable } from "@/components/custom/pricing-table";`,
    usage: `<PricingTable
  title="Simple pricing"
  yearlyNote="2 months free"
  plans={[
    { name: "Pro", monthly: 19, yearly: 190, popular: true,
      features: ["10 projects"], cta: { label: "Start trial", href: "/signup" } },
  ]}
/>`,
    props: [
      { name: "plans", type: "PricingPlan[]", required: true, description: "{ name, description?, monthly, yearly, features, cta, popular? }." },
      { name: "title", type: "string", default: `"Pricing"`, description: "Heading (h2)." },
      { name: "description", type: "string", description: "Line under the heading." },
      { name: "currency", type: "string", default: `"$"`, description: "Symbol before prices." },
      { name: "monthlyLabel / yearlyLabel", type: "string", default: `"Monthly" / "Yearly"`, description: "Switch labels." },
      { name: "yearlyNote", type: "string", description: "Note beside the switch, such as “2 months free”." },
      ROOT,
    ],
    a11y: ["The period switch is a labelled radio group and works without JavaScript.", "Prices read as “$19 per month”."],
    motion: {
      summary: "Switching the period rolls each price to its new value.",
      preview: <PricingTableMotion title="Simple pricing" description="Sample prices." plans={samplePlans} yearlyNote="2 months free" />,
      importLine: `import { PricingTableMotion } from "@/components/custom/pricing-table/pricing-table-motion";`,
      usage: `<PricingTableMotion title="Simple pricing" plans={plans} />`,
    },
  },
  "comparison-table": {
    preview: <ComparisonTable {...comparison} />,
    importLine: `import { ComparisonTable } from "@/components/custom/comparison-table";
import { FeatureGrid, FeatureGridMotion } from "@/components/custom/feature-grid";
import { FeatureRows, FeatureRowsMotion } from "@/components/custom/feature-rows";
import { IntegrationsGrid, IntegrationsGridMotion } from "@/components/custom/integrations-grid";
import { Steps, StepsMotion } from "@/components/custom/steps";
import { Accessibility, Moon, Palette, Server, Terminal, Zap } from "lucide-react";`,
    usage: `<ComparisonTable
  caption="Plans compared feature by feature"
  plans={["Free", "Pro"]}
  rows={[
    { feature: "Projects", values: ["1", "Unlimited"] },
    { feature: "Reports", values: [false, true] },
  ]}
/>`,
    props: [
      { name: "caption", type: "string", required: true, description: "Names the table for screen readers." },
      { name: "plans", type: "string[]", required: true, description: "Column headers." },
      { name: "rows", type: "{ feature: string; values: (boolean | string)[] }[]", required: true, description: "One value per plan." },
      { name: "title", type: "string", description: "Optional heading (h2)." },
      { name: "featureLabel", type: "string", default: `"Feature"`, description: "Header over the feature column." },
      ROOT,
    ],
    a11y: ["Real table markup with a caption, column headers and row headers.", "Checks and dashes read as “Included” and “Not included”.", "On narrow screens the table scrolls inside a focusable region."],
  },
  "cta-split": {
    preview: <CtaSplit {...cta} media={<DemoScreen />} />,
    importLine: `import { CtaSplit } from "@/components/custom/cta-split";`,
    usage: `<CtaSplit
  title="Ready to see your own usage?"
  primaryAction={{ label: "Start free", href: "/signup" }}
  media={<img src={screenshotUrl} alt="The dashboard" />}
/>`,
    props: [
      { name: "title", type: "string", required: true, description: "Heading (h2)." },
      { name: "primaryAction", type: "{ label; href }", required: true, description: "Filled button." },
      { name: "secondaryAction", type: "{ label; href }", description: "Outline button." },
      { name: "media", type: "ReactNode", required: true, description: "Image or component beside the copy." },
      { name: "description", type: "string", description: "Line under the heading." },
      ROOT,
    ],
    a11y: ["Give the media its own text alternative."],
    motion: {
      summary: "The media floats up and straightens as the band scrolls into view.",
      preview: <CtaSplitMotion {...cta} media={<DemoScreen />} />,
      importLine: `import { CtaSplitMotion } from "@/components/custom/cta-split/cta-split-motion";`,
      usage: `<CtaSplitMotion title="Ready?" primaryAction={{ label: "Start", href: "/signup" }} media={<Screenshot />} />`,
    },
  },
  newsletter: {
    preview: <Newsletter {...newsletter} />,
    importLine: `import { Newsletter } from "@/components/custom/newsletter";`,
    usage: `<Newsletter title="One email a month" action="/api/subscribe" note="Unsubscribe anytime." />`,
    props: [
      { name: "title", type: "string", required: true, description: "Heading (h2)." },
      { name: "action", type: "string", required: true, description: "Where the form posts." },
      { name: "method", type: `"post" | "get"`, default: `"post"`, description: "Form method." },
      { name: "inputLabel", type: "string", default: `"Email address"`, description: "Field label (visually hidden)." },
      { name: "buttonLabel", type: "string", default: `"Subscribe"`, description: "Button text." },
      { name: "note", type: "string", description: "Small print." },
      ROOT,
    ],
    a11y: ["A labelled email field with autocomplete; the form works without JavaScript."],
    motion: {
      summary: "With onSubmit, the form morphs into a success message; a live region announces the result.",
      preview: <NewsletterMotion {...newsletter} />,
      importLine: `import { NewsletterMotion } from "@/components/custom/newsletter/newsletter-motion";`,
      usage: `<NewsletterMotion title="One email a month" action="/api/subscribe" onSubmit={subscribe} />`,
      extraProps: [
        { name: "onSubmit", type: "(email: string) => Promise<void>", description: "Handle the signup yourself; shows sending, success and error states." },
        { name: "successMessage", type: "string", default: `"Thanks, you're subscribed."`, description: "Shown after onSubmit resolves." },
      ],
    },
  },
  "testimonials-wall": {
    preview: <TestimonialsWall title="What builders say" description="Sample quotes." items={sampleQuotes} />,
    importLine: `import { TestimonialsWall } from "@/components/custom/testimonials-wall";`,
    usage: `<TestimonialsWall
  title="What builders say"
  items={[{ quote: "…", author: "Maya R.", role: "Founder" }]}
/>`,
    props: [
      { name: "items", type: "{ quote; author; role?; avatar? }[]", required: true, description: "Quotes, in reading order." },
      { name: "title", type: "string", description: "Heading (h2)." },
      { name: "description", type: "string", description: "Line under the heading." },
      ROOT,
    ],
    a11y: ["Each quote is a figure with a blockquote and a figcaption naming the author."],
    motion: {
      summary: "Three columns drift slowly upward at different speeds; hover, keyboard focus or the pause button stop them.",
      preview: <TestimonialsWallMotion title="What builders say" description="Sample quotes." items={sampleQuotes} />,
      importLine: `import { TestimonialsWallMotion } from "@/components/custom/testimonials-wall/testimonials-wall-motion";`,
      usage: `<TestimonialsWallMotion title="What builders say" items={quotes} />`,
    },
  },
  "testimonial-highlight": {
    preview: <TestimonialHighlight quote="We replaced a week of landing-page work with an afternoon." author="Maya R." role="Founder" company="Sample Co" />,
    importLine: `import { TestimonialHighlight } from "@/components/custom/testimonial-highlight";`,
    usage: `<TestimonialHighlight
  quote="We replaced a week of landing-page work with an afternoon."
  author="Maya R."
  role="Founder"
  company="Sample Co"
/>`,
    props: [
      { name: "quote", type: "string", required: true, description: "The quote, without quotation marks." },
      { name: "author", type: "string", required: true, description: "Who said it." },
      { name: "role", type: "string", description: "Author's role." },
      { name: "company", type: "string", description: "Author's company." },
      { name: "avatar", type: "string", description: "Image URL; initials otherwise." },
      ROOT,
    ],
    a11y: ["A figure with blockquote and figcaption, so the source is tied to the quote."],
    motion: {
      summary: "The quote's words brighten one after another as it scrolls into view. Screen readers hear it as one sentence.",
      preview: <TestimonialHighlightMotion quote="We replaced a week of landing-page work with an afternoon." author="Maya R." role="Founder" company="Sample Co" />,
      importLine: `import { TestimonialHighlightMotion } from "@/components/custom/testimonial-highlight/testimonial-highlight-motion";`,
      usage: `<TestimonialHighlightMotion quote="…" author="Maya R." />`,
    },
  },
  "stats-band": {
    preview: <StatsBand title="By the numbers" description="Sample data." stats={sampleStats} />,
    importLine: `import { StatsBand } from "@/components/custom/stats-band";`,
    usage: `<StatsBand
  title="By the numbers"
  stats={[
    { value: 12000, label: "Installs", suffix: "+" },
    { value: 99.9, label: "Uptime", suffix: "%", decimals: 1 },
  ]}
/>`,
    props: [
      { name: "stats", type: "{ value; label; prefix?; suffix?; decimals? }[]", required: true, description: "2 to 4 read best. Use real numbers." },
      { name: "title", type: "string", description: "Heading (h2)." },
      { name: "description", type: "string", description: "Line under the heading." },
      ROOT,
    ],
    a11y: ["A description list: each label is the term and the number its value.", "Numbers format with a fixed locale, so server and browser match."],
    motion: {
      summary: "Each number counts up once when the band scrolls into view. The final number is in the page before JavaScript and for screen readers.",
      preview: <StatsBandMotion title="By the numbers" description="Sample data." stats={sampleStats} />,
      importLine: `import { StatsBandMotion } from "@/components/custom/stats-band/stats-band-motion";`,
      usage: `<StatsBandMotion stats={stats} />`,
    },
  },
  "social-proof": {
    preview: <SocialProof text="Joined by 300 indie teams (sample)" rating={4.8} people={["Ana", "Ben", "Cy", "Dee", "Eli"].map((name) => ({ name }))} />,
    importLine: `import { SocialProof } from "@/components/custom/social-proof";`,
    usage: `<SocialProof
  text="Joined by 300 indie teams"
  rating={4.8}
  people={[{ name: "Ana", avatar: "/ana.webp" }]}
/>`,
    props: [
      { name: "text", type: "string", required: true, description: "One line. Keep it true." },
      { name: "people", type: "{ name: string; avatar?: string }[]", required: true, description: "Avatar stack; initials when there is no image." },
      { name: "rating", type: "number", description: "Average out of 5; stars plus the number in words." },
      { name: "...props", type: `React.ComponentProps<"div">`, description: "Any other div attribute goes to the root element." },
    ],
    a11y: ["Avatars are decorative; the rating is announced as “Rated 4.8 out of 5”."],
    motion: {
      summary: "Avatars pop in one after another when the row comes into view.",
      preview: <SocialProofMotion text="Joined by 300 indie teams (sample)" rating={4.8} people={["Ana", "Ben", "Cy", "Dee", "Eli"].map((name) => ({ name }))} />,
      importLine: `import { SocialProofMotion } from "@/components/custom/social-proof/social-proof-motion";`,
      usage: `<SocialProofMotion text="Joined by 300 indie teams" people={people} />`,
    },
  },
  "feature-grid": {
    preview: <FeatureGrid title="Everything a launch page needs" description="Sample features." items={sampleFeatures} />,
    importLine: `import { FeatureGrid } from "@/components/custom/feature-grid";`,
    usage: `<FeatureGrid
  title="Everything a launch page needs"
  columns={3}
  items={[{ title: "One command", description: "Install with the CLI.", icon: Terminal }]}
/>`,
    props: [
      { name: "items", type: "{ title; description; icon?: LucideIcon }[]", required: true, description: "Features in reading order." },
      { name: "columns", type: "2 | 3 | 4", default: "3", description: "Columns from the lg breakpoint." },
      { name: "title / description", type: "string", description: "Heading (h2) and line under it." },
      ROOT,
    ],
    a11y: ["A list of features, each with its own h3."],
    motion: {
      summary: "Features rise in one after another as the grid scrolls into view.",
      preview: <FeatureGridMotion title="Everything a launch page needs" description="Sample features." items={sampleFeatures} />,
      importLine: `import { FeatureGridMotion } from "@/components/custom/feature-grid/feature-grid-motion";`,
      usage: `<FeatureGridMotion items={features} />`,
    },
  },
  "feature-rows": {
    preview: (
      <FeatureRows
        rows={[
          { label: "Install", title: "One command, then it's yours", description: "The CLI copies the component into your project. Sample copy.", media: <DemoScreen /> },
          { label: "Theme", title: "Matches the rest of your app", description: "Sections read your shadcn tokens. Sample copy.", media: <DemoScreen /> },
        ]}
      />
    ),
    importLine: `import { FeatureRows } from "@/components/custom/feature-rows";`,
    usage: `<FeatureRows
  rows={[
    { label: "Install", title: "One command", description: "…", media: <Screenshot /> },
    { label: "Theme", title: "Your colors", description: "…", media: <Screenshot /> },
  ]}
/>`,
    props: [
      { name: "rows", type: "{ title; description; media; label? }[]", required: true, description: "Rows alternate media sides from the lg breakpoint." },
      { name: "title / description", type: "string", description: "Optional heading (h2) above the rows." },
      ROOT,
    ],
    a11y: ["Copy always comes before media in reading order, whatever side the media shows on."],
    motion: {
      summary: "Each row's media slides in from its own side as it scrolls into view.",
      preview: (
        <FeatureRowsMotion
          rows={[
            { label: "Install", title: "One command, then it's yours", description: "Sample copy.", media: <DemoScreen /> },
            { label: "Theme", title: "Matches the rest of your app", description: "Sample copy.", media: <DemoScreen /> },
          ]}
        />
      ),
      importLine: `import { FeatureRowsMotion } from "@/components/custom/feature-rows/feature-rows-motion";`,
      usage: `<FeatureRowsMotion rows={rows} />`,
    },
  },
  steps: {
    preview: <Steps title="How it works" steps={sampleSteps} />,
    importLine: `import { Steps } from "@/components/custom/steps";`,
    usage: `<Steps
  title="How it works"
  steps={[{ title: "Pick a section", description: "…" }, { title: "Run one command", description: "…" }]}
/>`,
    props: [
      { name: "steps", type: "{ title; description }[]", required: true, description: "In order; 3 or 4 read best." },
      { name: "title / description", type: "string", description: "Heading (h2) and line under it." },
      ROOT,
    ],
    a11y: ["An ordered list; each step is announced as “Step N”."],
    motion: {
      summary: "The line connecting the steps draws across as you scroll them into view.",
      preview: <StepsMotion title="How it works" steps={sampleSteps} />,
      importLine: `import { StepsMotion } from "@/components/custom/steps/steps-motion";`,
      usage: `<StepsMotion steps={steps} />`,
    },
  },
  "integrations-grid": {
    preview: <IntegrationsGrid title="Works with your stack" description="Sample tiles." items={sampleIntegrations} />,
    importLine: `import { IntegrationsGrid } from "@/components/custom/integrations-grid";`,
    usage: `<IntegrationsGrid
  title="Works with your stack"
  items={[{ name: "Stripe", description: "Payments", logo: <StripeLogo />, href: "/integrations/stripe" }]}
/>`,
    props: [
      { name: "items", type: "{ name; description?; logo?; href? }[]", required: true, description: "Tiles; ones with href are links." },
      { name: "title / description", type: "string", description: "Heading (h2) and line under it." },
      ROOT,
    ],
    a11y: ["Logos are decorative; each tile is named by its text.", "Only tiles with an href are links."],
    motion: {
      summary: "Tiles lift and glow in your primary color on hover and keyboard focus.",
      preview: <IntegrationsGridMotion title="Works with your stack" description="Sample tiles." items={sampleIntegrations} />,
      importLine: `import { IntegrationsGridMotion } from "@/components/custom/integrations-grid/integrations-grid-motion";`,
      usage: `<IntegrationsGridMotion items={integrations} />`,
    },
  },
};
