import { AnnouncementBar } from "@/components/custom/announcement-bar";
import { BlogGrid, BlogGridMotion } from "@/components/custom/blog-grid";
import { ComingSoon } from "@/components/custom/coming-soon";
import { FooterSimple } from "@/components/custom/footer-simple";
import { NavbarFloating, NavbarFloatingMotion } from "@/components/custom/navbar-floating";
import { NotFound, NotFoundMotion } from "@/components/custom/not-found";
import { Changelog } from "@/components/custom/changelog";
import { ComparisonTable } from "@/components/custom/comparison-table";
import { Contact } from "@/components/custom/contact";
import { FaqTwoColumn } from "@/components/custom/faq-two-column";
import { Team } from "@/components/custom/team";
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
  { title: "One command", description: "Install any section with the shadcn CLI.", icon: <Terminal /> },
  { title: "Your theme", description: "Sections read your shadcn tokens.", icon: <Palette /> },
  { title: "Server-first", description: "Plain sections render as server components.", icon: <Server /> },
  { title: "Accessible", description: "Semantic HTML and keyboard support.", icon: <Accessibility /> },
  { title: "Light and dark", description: "Every section works in both themes.", icon: <Moon /> },
  { title: "Optional motion", description: "Add the motion version where it helps.", icon: <Zap /> },
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

export const samplePeople = [
  { name: "Ana Diaz", role: "Founder", bio: "Writes most of the sections." },
  { name: "Ben Okafor", role: "Design", bio: "Draws them first." },
  { name: "Cy Tanaka", role: "Engineering", bio: "Keeps them accessible." },
  { name: "Dee Morgan", role: "Community", bio: "Answers your issues." },
];

export const samplePosts = [
  { title: "Ship a landing page in an afternoon", excerpt: "Pick sections, install, write copy. Sample post.", author: "Ana Diaz", date: "2026-10-12", readTime: "5 min read", category: "Guide", image: "/demo/blog-cover.webp", href: "#post-1" },
  { title: "Plain or motion: when to animate", excerpt: "Motion should carry meaning. Sample post.", author: "Ben Okafor", date: "2026-10-20", readTime: "4 min read", category: "Design", href: "#post-2" },
  { title: "Accessible pricing tables", excerpt: "Prices that screen readers can read. Sample post.", author: "Cy Tanaka", date: "2026-10-28", readTime: "6 min read", category: "A11y", href: "#post-3" },
];

export const sampleChangelog = [
  { date: "2026-11-03", version: "0.3.0", title: "Pricing, proof and features", items: ["Pricing table with a monthly/yearly switch", "Testimonials wall and stats band", "Feature grid and steps"] },
  { date: "2026-11-02", version: "0.2.0", title: "Ten heroes", items: ["Every hero in plain and motion versions", "Live page builder on the site"] },
];

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
    importLine: `import { AnnouncementBar } from "@/components/custom/announcement-bar";
import { BlogGrid, BlogGridMotion } from "@/components/custom/blog-grid";
import { ComingSoon } from "@/components/custom/coming-soon";
import { FooterSimple } from "@/components/custom/footer-simple";
import { NavbarFloating, NavbarFloatingMotion } from "@/components/custom/navbar-floating";
import { NotFound, NotFoundMotion } from "@/components/custom/not-found";
import { Changelog } from "@/components/custom/changelog";
import { ComparisonTable } from "@/components/custom/comparison-table";
import { Contact } from "@/components/custom/contact";
import { FaqTwoColumn } from "@/components/custom/faq-two-column";
import { Team } from "@/components/custom/team";
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
  items={[{ title: "One command", description: "Install with the CLI.", icon: <Terminal /> }]}
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
  team: {
    preview: <Team title="The people behind it" description="Sample people." people={samplePeople} />,
    importLine: `import { Team } from "@/components/custom/team";`,
    usage: `<Team
  title="The people behind it"
  people={[{ name: "Ana Diaz", role: "Founder", avatar: "/ana.webp", links: [{ label: "GitHub", href: "https://github.com/ana" }] }]}
/>`,
    props: [
      { name: "people", type: "{ name; role; avatar?; bio?; links? }[]", required: true, description: "Initials replace a missing avatar." },
      { name: "title / description", type: "string", description: "Heading (h2) and line under it." },
      ROOT,
    ],
    a11y: ["Each person's name is an h3.", "Links are named “Ana Diaz on GitHub”, not just “GitHub”."],
  },
  changelog: {
    preview: <Changelog entries={sampleChangelog} />,
    importLine: `import { Changelog } from "@/components/custom/changelog";`,
    usage: `<Changelog
  entries={[{ date: "2026-11-03", version: "0.3.0", title: "New sections", items: ["Pricing table"] }]}
/>`,
    props: [
      { name: "entries", type: "{ date; title; version?; items: string[] }[]", required: true, description: "ISO dates; newest first." },
      { name: "title", type: "string", default: `"Changelog"`, description: "Heading (h2)." },
      ROOT,
    ],
    a11y: ["Dates use <time datetime> and format in UTC, so server and browser agree.", "Each release is an article in an ordered list."],
  },
  "blog-grid": {
    preview: <BlogGrid title="From the blog" description="Sample posts." posts={samplePosts} viewAll={{ label: "All posts", href: "#blog" }} />,
    importLine: `import { BlogGrid } from "@/components/custom/blog-grid";`,
    usage: `<BlogGrid
  title="From the blog"
  posts={posts}
  viewAll={{ label: "All posts", href: "/blog" }}
/>`,
    props: [
      { name: "posts", type: "BlogCard props[]", required: true, description: "title, excerpt, author, date, href, image?, readTime?, category?" },
      { name: "viewAll", type: "{ label; href }", description: "Link to the full blog." },
      { name: "title / description", type: "string", description: "Heading (h2) and line under it." },
      ROOT,
    ],
    a11y: ["Each post is an article from BlogCard."],
    motion: {
      summary: "Cards rise in one after another as the grid scrolls into view.",
      preview: <BlogGridMotion title="From the blog" description="Sample posts." posts={samplePosts} viewAll={{ label: "All posts", href: "#blog" }} />,
      importLine: `import { BlogGridMotion } from "@/components/custom/blog-grid/blog-grid-motion";`,
      usage: `<BlogGridMotion posts={posts} />`,
    },
  },
  "faq-two-column": {
    preview: (
      <FaqTwoColumn
        description="Can't find what you need? Sample copy."
        contact={{ label: "Email us", href: "#contact" }}
        items={[
          { question: "Is it free?", answer: "Yes, MIT licensed." },
          { question: "Do I need a package?", answer: "No, the code lands in your project." },
          { question: "Does it work with my theme?", answer: "Yes, it reads your shadcn tokens." },
        ]}
      />
    ),
    importLine: `import { FaqTwoColumn } from "@/components/custom/faq-two-column";`,
    usage: `<FaqTwoColumn
  contact={{ label: "Email us", href: "mailto:hi@example.com" }}
  items={[{ question: "Is it free?", answer: "Yes." }]}
/>`,
    props: [
      { name: "items", type: "{ question; answer }[]", required: true, description: "Questions in order." },
      { name: "contact", type: "{ label; href }", description: "Link for anything not answered." },
      { name: "title", type: "string", default: `"Frequently asked questions"`, description: "Heading (h2)." },
      { name: "description", type: "string", description: "Line under the heading." },
      ROOT,
    ],
    a11y: ["Native details/summary: keyboard and screen-reader support with no JavaScript."],
  },
  contact: {
    preview: (
      <Contact
        description="We reply within two working days. Sample copy."
        action="#contact"
        details={[
          { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
          { label: "Office", value: "Sample Street 1, Example City" },
        ]}
      />
    ),
    importLine: `import { Contact } from "@/components/custom/contact";`,
    usage: `<Contact
  action="/api/contact"
  details={[{ label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" }]}
/>`,
    props: [
      { name: "action", type: "string", required: true, description: "Where the form posts (name, email, message)." },
      { name: "details", type: "{ label; value; href? }[]", description: "Contact details beside the form." },
      { name: "submitLabel", type: "string", default: `"Send message"`, description: "Button text." },
      { name: "title / description", type: "string", description: "Heading (h2) and line under it." },
      ROOT,
    ],
    a11y: ["Every field has a visible label and the right input type and autocomplete."],
  },
  "not-found": {
    preview: <NotFound links={[{ label: "Read the docs", href: "#docs" }]} />,
    importLine: `import { NotFound } from "@/components/custom/not-found";`,
    usage: `// app/not-found.tsx
export default function NotFoundPage() {
  return <NotFound links={[{ label: "Read the docs", href: "/docs" }]} />;
}`,
    props: [
      { name: "code", type: "string", default: `"404"`, description: "The big number (decorative)." },
      { name: "title", type: "string", default: `"Page not found"`, description: "The page's h1." },
      { name: "description", type: "string", description: "One line on what happened." },
      { name: "home", type: "{ label; href }", default: `{ label: "Back to home", href: "/" }`, description: "Main way out." },
      { name: "links", type: "{ label; href }[]", description: "Other helpful pages." },
      ROOT,
    ],
    a11y: ["The big number is hidden from screen readers; the h1 says what happened."],
    motion: {
      summary: "The big number tilts toward the mouse pointer.",
      preview: <NotFoundMotion links={[{ label: "Read the docs", href: "#docs" }]} />,
      importLine: `import { NotFoundMotion } from "@/components/custom/not-found/not-found-motion";`,
      usage: `<NotFoundMotion />`,
    },
  },
  "coming-soon": {
    preview: <ComingSoon title="Something new is cooking" description="Leave your email and hear first. Sample copy." action="#notify" launchDate="2026-12-01" />,
    importLine: `import { ComingSoon } from "@/components/custom/coming-soon";`,
    usage: `<ComingSoon
  title="Something new is cooking"
  action="/api/notify"
  launchDate="2026-12-01"
/>`,
    props: [
      { name: "title", type: "string", required: true, description: "The page's h1." },
      { name: "action", type: "string", required: true, description: "Where the notify form posts." },
      { name: "launchDate", type: "string", description: "ISO date, shown in a <time>. Leave it out rather than invent one." },
      { name: "badge", type: "string", default: `"Coming soon"`, description: "Badge text." },
      { name: "buttonLabel", type: "string", default: `"Notify me"`, description: "Button text." },
      { name: "description", type: "string", description: "Line under the title." },
      ROOT,
    ],
    a11y: ["A labelled email field; the form works without JavaScript.", "No countdown timer, so nothing changes on screen every second."],
  },
  "announcement-bar": {
    preview: <AnnouncementBar message="New: pricing tables and feature grids." link={{ label: "See what's new", href: "#changelog" }} dismissible />,
    importLine: `import { AnnouncementBar } from "@/components/custom/announcement-bar";`,
    usage: `<AnnouncementBar
  message="New: pricing tables and feature grids."
  link={{ label: "See what's new", href: "/changelog" }}
  dismissible
/>`,
    props: [
      { name: "message", type: "string", required: true, description: "One short line." },
      { name: "link", type: "{ label; href }", description: "Optional link after the message." },
      { name: "dismissible", type: "boolean", default: "false", description: "Adds a close button; dismissal lasts for the page view." },
      { name: "...props", type: `React.ComponentProps<"div">`, description: "Any other div attribute goes to the root element." },
    ],
    a11y: ["The close button is labelled “Dismiss announcement”."],
  },
  "navbar-floating": {
    preview: (
      <div className="py-6">
        <NavbarFloating brand="Acme" links={[{ label: "Product", href: "#product" }, { label: "Pricing", href: "#pricing" }, { label: "Docs", href: "#docs" }]} action={{ label: "Sign up", href: "#signup" }} />
      </div>
    ),
    importLine: `import { NavbarFloating } from "@/components/custom/navbar-floating";`,
    usage: `<NavbarFloating
  brand="Acme"
  links={[{ label: "Pricing", href: "/pricing" }]}
  action={{ label: "Sign up", href: "/signup" }}
/>`,
    props: [
      { name: "brand", type: "string", required: true, description: "Name at the left, linked to brandHref." },
      { name: "brandHref", type: "string", default: `"/"`, description: "Where the brand links." },
      { name: "links", type: "{ label; href }[]", required: true, description: "Main navigation." },
      { name: "action", type: "{ label; href }", description: "Button at the right." },
      { name: "...props", type: `React.ComponentProps<"header">`, description: "Any other header attribute goes to the root element." },
    ],
    a11y: ["Links sit in a nav labelled “Main”; on phones they fold into a details/summary menu labelled “Menu”."],
    motion: {
      summary: "Once you scroll, the pill tightens slightly and lifts with a deeper shadow.",
      preview: (
        <div className="py-6">
          <NavbarFloatingMotion brand="Acme" links={[{ label: "Product", href: "#product" }, { label: "Pricing", href: "#pricing" }]} action={{ label: "Sign up", href: "#signup" }} />
        </div>
      ),
      importLine: `import { NavbarFloatingMotion } from "@/components/custom/navbar-floating/navbar-floating-motion";`,
      usage: `<NavbarFloatingMotion brand="Acme" links={links} />`,
    },
  },
  "footer-simple": {
    preview: <FooterSimple brand="Acme" note="© Acme. Sample content." links={[{ label: "Privacy", href: "#privacy" }, { label: "Terms", href: "#terms" }, { label: "Contact", href: "#contact" }]} />,
    importLine: `import { FooterSimple } from "@/components/custom/footer-simple";`,
    usage: `<FooterSimple brand="Acme" note="© 2026 Acme" links={[{ label: "Privacy", href: "/privacy" }]} />`,
    props: [
      { name: "brand", type: "string", required: true, description: "Name at the left." },
      { name: "links", type: "{ label; href }[]", required: true, description: "A few links in a nav labelled “Footer”." },
      { name: "note", type: "string", description: "Small print." },
      { name: "...props", type: `React.ComponentProps<"footer">`, description: "Any other footer attribute goes to the root element." },
    ],
    a11y: ["A footer landmark with its own labelled nav."],
  },
};
