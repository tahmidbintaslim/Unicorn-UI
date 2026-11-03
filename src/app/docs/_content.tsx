import { BentoGrid } from "@/components/custom/bento-grid";
import { BlogCard } from "@/components/custom/blog-card";
import { CtaBanner } from "@/components/custom/cta-banner";
import { Faq } from "@/components/custom/faq";
import { FeatureCard } from "@/components/custom/feature-card";
import { Footer } from "@/components/custom/footer";
import { Hero, HeroMotion } from "@/components/custom/hero";
import { InteractiveCard } from "@/components/custom/interactive-card";
import { LogoCloud } from "@/components/custom/logo-cloud";
import { Navbar } from "@/components/custom/navbar";
import { PricingCard } from "@/components/custom/pricing-card";
import { StatisticsCard } from "@/components/custom/statistics-card";
import { TestimonialCard } from "@/components/custom/testimonial-card";
import { Accessibility, Copy, Moon, Terminal, Users, Zap } from "lucide-react";
import React from "react";
import { HERO_DOCS } from "./_content-heroes";

export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

/** The optional motion version of a section, shown behind the docs Plain/Motion switch. */
export interface MotionDoc {
  preview: React.ReactNode;
  importLine: string;
  usage: string;
  /** Props only the motion version has. */
  extraProps?: PropDoc[];
  /** What moves, in one or two sentences. */
  summary: string;
}

export interface SectionDoc {
  /** Live preview, rendered with the visitor's theme. */
  preview: React.ReactNode;
  /** Import path and component name for the usage snippet. */
  importLine: string;
  usage: string;
  props: PropDoc[];
  /** Accessibility notes worth knowing before you ship it. */
  a11y: string[];
  /** Narrow previews (cards) sit in a centered column. */
  narrow?: boolean;
  motion?: MotionDoc;
}

const ROOT_PROPS = (el: string): PropDoc => ({
  name: "...props",
  type: `React.ComponentProps<"${el}">`,
  description: `Any other ${el} attribute (id, aria-*, data-*, ref) goes to the root element.`,
});

const BASE_DOCS: Record<string, SectionDoc> = {
  navbar: {
    preview: (
      <Navbar
        brand="Acme"
        links={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Docs", href: "#docs" },
        ]}
        action={{ label: "Get started", href: "#start" }}
      />
    ),
    importLine: `import { Navbar } from "@/components/custom/navbar";`,
    usage: `<Navbar
  brand="Acme"
  links={[
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
  ]}
  action={{ label: "Get started", href: "/signup" }}
/>`,
    props: [
      { name: "brand", type: "string", required: true, description: "Name shown on the left, linked to brandHref." },
      { name: "brandHref", type: "string", default: `"/"`, description: "Where the brand links to." },
      { name: "links", type: "{ label: string; href: string }[]", required: true, description: "Main navigation links." },
      { name: "action", type: "{ label: string; href: string }", description: "Optional call to action on the right." },
      ROOT_PROPS("header"),
    ],
    a11y: [
      "Links sit in a <nav aria-label=\"Main\">.",
      "On phones the links fold into a details/summary menu that works without JavaScript; the toggle is labelled “Menu”.",
    ],
  },
  hero: {
    preview: (
      <Hero
        eyebrow="New"
        title="Ship your landing page today"
        description="Copy the sections you need and make them yours."
        primaryAction={{ label: "Get started", href: "#start" }}
        secondaryAction={{ label: "Learn more", href: "#more" }}
      />
    ),
    importLine: `import { Hero } from "@/components/custom/hero";`,
    usage: `<Hero
  eyebrow="New"
  title="Ship your landing page today"
  description="Copy the sections you need and make them yours."
  primaryAction={{ label: "Get started", href: "/signup" }}
  secondaryAction={{ label: "Learn more", href: "/docs" }}
/>`,
    props: [
      { name: "title", type: "string", required: true, description: "The headline, rendered as the page's h1." },
      { name: "eyebrow", type: "string", description: "Small badge above the title." },
      { name: "description", type: "string", description: "Supporting line under the title." },
      { name: "primaryAction", type: "{ label: string; href: string }", description: "Filled button." },
      { name: "secondaryAction", type: "{ label: string; href: string }", description: "Outline button." },
      ROOT_PROPS("section"),
    ],
    a11y: ["The title is an h1, so use one Hero per page."],
    motion: {
      summary: "The title's words rise in one after another, then the description and buttons follow.",
      preview: (
        <HeroMotion
          eyebrow="New"
          title="Ship your landing page today"
          description="Copy the sections you need and make them yours."
          primaryAction={{ label: "Get started", href: "#start" }}
          secondaryAction={{ label: "Learn more", href: "#more" }}
        />
      ),
      importLine: `import { HeroMotion } from "@/components/custom/hero/hero-motion";`,
      usage: `<HeroMotion
  eyebrow="New"
  title="Ship your landing page today"
  description="Copy the sections you need and make them yours."
  primaryAction={{ label: "Get started", href: "/signup" }}
/>`,
    },
  },
  "logo-cloud": {
    preview: <LogoCloud logos={[{ name: "Acme" }, { name: "Globex" }, { name: "Initech" }, { name: "Umbrella" }]} />,
    importLine: `import { LogoCloud } from "@/components/custom/logo-cloud";`,
    usage: `<LogoCloud
  title="Trusted by teams at"
  logos={[{ name: "Acme" }, { name: "Globex", logo: <GlobexLogo /> }]}
/>`,
    props: [
      { name: "logos", type: "{ name: string; logo?: ReactNode }[]", required: true, description: "Companies to show. Without a logo the name is shown as text." },
      { name: "title", type: "string", default: `"Trusted by teams at"`, description: "Line above the logos." },
      ROOT_PROPS("section"),
    ],
    a11y: ["When a logo is given, the company name stays available to screen readers as visually hidden text."],
  },
  "bento-grid": {
    preview: (
      <BentoGrid
        title="Why teams pick it"
        items={[
          { title: "One command", description: "Install any section with the shadcn CLI.", icon: Terminal, size: "large" },
          { title: "Fast", description: "Plain components, no runtime.", icon: Zap },
          { title: "Accessible", description: "Semantic markup and labels.", icon: Accessibility },
          { title: "Light and dark", description: "Uses your shadcn theme variables.", icon: Moon, size: "wide" },
        ]}
      />
    ),
    importLine: `import { BentoGrid } from "@/components/custom/bento-grid";`,
    usage: `<BentoGrid
  title="Why teams pick it"
  items={[
    { title: "One command", description: "Install any section.", icon: Terminal, size: "large" },
    { title: "Fast", description: "Plain components.", icon: Zap },
  ]}
/>`,
    props: [
      { name: "items", type: "BentoItem[]", required: true, description: "Tiles: { title, description, icon?, size? }." },
      { name: "items[].size", type: `"default" | "wide" | "tall" | "large"`, default: `"default"`, description: "Cells the tile spans from the md breakpoint up." },
      { name: "items[].icon", type: "LucideIcon", description: "Icon component shown above the title." },
      { name: "title", type: "string", description: "Optional heading above the grid." },
      ROOT_PROPS("section"),
    ],
    a11y: ["Tiles are list items, so screen readers announce how many there are."],
  },
  faq: {
    preview: (
      <Faq
        items={[
          { question: "Is it free?", answer: "Yes. MIT licensed, for personal and commercial projects." },
          { question: "Do I need to install a package?", answer: "No. The shadcn CLI copies the component into your project." },
          { question: "Does it work with my theme?", answer: "Yes. It uses your shadcn theme variables." },
        ]}
      />
    ),
    importLine: `import { Faq } from "@/components/custom/faq";`,
    usage: `<Faq
  items={[
    { question: "Is it free?", answer: "Yes, MIT licensed." },
    { question: "Do I need a package?", answer: "No, the code is yours." },
  ]}
/>`,
    props: [
      { name: "items", type: "{ question: string; answer: string }[]", required: true, description: "Questions and answers, in order." },
      { name: "title", type: "string", default: `"Frequently asked questions"`, description: "Heading above the list." },
      ROOT_PROPS("section"),
    ],
    a11y: ["Built on native <details> and <summary>: keyboard and screen-reader support come from the browser, with no JavaScript."],
  },
  "cta-banner": {
    preview: (
      <CtaBanner title="Start building" description="Copy a section and make it yours." actionLabel="Get started" actionHref="#start" />
    ),
    importLine: `import { CtaBanner } from "@/components/custom/cta-banner";`,
    usage: `<CtaBanner
  title="Start building"
  description="Copy a section and make it yours."
  actionLabel="Get started"
  actionHref="/signup"
/>`,
    props: [
      { name: "title", type: "string", required: true, description: "Heading of the band." },
      { name: "actionLabel", type: "string", required: true, description: "Button text." },
      { name: "actionHref", type: "string", required: true, description: "Button link." },
      { name: "description", type: "string", description: "One line under the heading." },
      ROOT_PROPS("section"),
    ],
    a11y: ["The action is a plain link, so it works without JavaScript."],
  },
  footer: {
    preview: (
      <Footer
        brand="Acme"
        note="© Acme. Sample content."
        columns={[
          { title: "Product", links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }] },
          { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Blog", href: "#blog" }] },
        ]}
      />
    ),
    importLine: `import { Footer } from "@/components/custom/footer";`,
    usage: `<Footer
  brand="Acme"
  note="© 2026 Acme"
  columns={[
    { title: "Product", links: [{ label: "Pricing", href: "/pricing" }] },
  ]}
/>`,
    props: [
      { name: "brand", type: "string", required: true, description: "Name shown at the top left." },
      { name: "columns", type: "{ title: string; links: { label: string; href: string }[] }[]", required: true, description: "Link columns." },
      { name: "note", type: "string", description: "Small print under the columns, such as a copyright line." },
      ROOT_PROPS("footer"),
    ],
    a11y: ["Columns sit in a <nav aria-label=\"Footer\">, separate from the main navigation."],
  },
  "pricing-card": {
    narrow: true,
    preview: (
      <PricingCard
        name="Pro"
        description="For growing teams"
        price={19}
        popular
        features={[
          { text: "10 projects", included: true },
          { text: "Priority support", included: true },
          { text: "Custom domain", included: false },
        ]}
        ctaText="Start trial"
        className="w-full max-w-sm"
      />
    ),
    importLine: `import { PricingCard } from "@/components/custom/pricing-card";`,
    usage: `<PricingCard
  name="Pro"
  price={19}
  period="month"
  popular
  features={[
    { text: "10 projects", included: true },
    { text: "Custom domain", included: false },
  ]}
  ctaText="Start trial"
  onSelect={() => router.push("/checkout?plan=pro")}
/>`,
    props: [
      { name: "name", type: "string", required: true, description: "Plan name." },
      { name: "price", type: "number", required: true, description: "Price amount." },
      { name: "features", type: "{ text: string; included: boolean }[]", required: true, description: "Feature list; excluded items are marked for screen readers." },
      { name: "description", type: "string", description: "Line under the plan name." },
      { name: "currency", type: "string", default: `"$"`, description: "Symbol before the price." },
      { name: "period", type: "string", default: `"month"`, description: "Billing period after the price." },
      { name: "ctaText", type: "string", default: `"Get Started"`, description: "Button text." },
      { name: "popular", type: "boolean", default: "false", description: "Highlights the card with a “Most Popular” badge." },
      { name: "onSelect", type: "() => void", description: "Called when the button is clicked. Needs a client component parent." },
      ROOT_PROPS("div"),
    ],
    a11y: ["The price is read as “$19 per month”.", "Each feature says whether it is included or not, not only with an icon."],
  },
  "testimonial-card": {
    narrow: true,
    preview: (
      <TestimonialCard
        testimonial="We swapped our hand-built landing page for Tapas sections in an afternoon. Sample quote."
        author="Sarah Johnson"
        role="Product Manager"
        company="Example Co"
        rating={5}
        avatar="/demo/avatar.webp"
        className="w-full max-w-md"
      />
    ),
    importLine: `import { TestimonialCard } from "@/components/custom/testimonial-card";`,
    usage: `<TestimonialCard
  testimonial="What they used, what changed, and why it mattered."
  author="Sarah Johnson"
  role="Product Manager"
  company="Example Co"
  rating={5}
  avatar={customer.avatarUrl}
/>`,
    props: [
      { name: "testimonial", type: "string", required: true, description: "The quote." },
      { name: "author", type: "string", required: true, description: "Who said it." },
      { name: "role", type: "string", description: "Author's role." },
      { name: "company", type: "string", description: "Author's company." },
      { name: "avatar", type: "string", description: "Image URL, rendered with next/image." },
      { name: "rating", type: "number", description: "Stars out of 5." },
      { name: "variant", type: `"default" | "bordered" | "elevated"`, default: `"default"`, description: "Card style." },
      ROOT_PROPS("div"),
    ],
    a11y: ["The rating is announced as “Rated N out of 5”."],
  },
  "feature-card": {
    narrow: true,
    preview: (
      <FeatureCard
        title="Copy and paste"
        description="Install with one command, then edit the code like any other file in your project."
        icon={Copy}
        badge="New"
        ctaText="Learn more"
        className="w-full max-w-sm"
      />
    ),
    importLine: `import { FeatureCard } from "@/components/custom/feature-card";`,
    usage: `<FeatureCard
  title="Copy and paste"
  description="Install with one command, then edit the code."
  icon={Copy}
  badge="New"
  ctaText="Learn more"
  orientation="vertical"
/>`,
    props: [
      { name: "title", type: "string", required: true, description: "Feature name." },
      { name: "description", type: "string", required: true, description: "One or two sentences." },
      { name: "icon", type: "LucideIcon", required: true, description: "Icon component." },
      { name: "iconColor", type: "string", default: `"text-primary"`, description: "Tailwind classes for the icon color." },
      { name: "iconBg", type: "string", default: `"bg-primary/10"`, description: "Tailwind classes for the icon tile." },
      { name: "badge", type: "string", description: "Optional badge text." },
      { name: "badgeVariant", type: `"default" | "secondary" | "destructive" | "outline"`, default: `"secondary"`, description: "Badge style." },
      { name: "ctaText", type: "string", description: "Button text; no button when omitted." },
      { name: "onCtaClick", type: "() => void", description: "Called when the button is clicked. Needs a client component parent." },
      { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "Icon above or beside the text." },
      { name: "hoverEffect", type: "boolean", default: "true", description: "Lift the card on hover." },
      ROOT_PROPS("div"),
    ],
    a11y: ["The icon is decorative and hidden from screen readers."],
  },
  "statistics-card": {
    narrow: true,
    preview: (
      <StatisticsCard
        title="Monthly active users"
        value="125,430"
        change={12.5}
        changePeriod="vs last month"
        icon={Users}
        className="w-full max-w-sm"
      />
    ),
    importLine: `import { StatisticsCard } from "@/components/custom/statistics-card";`,
    usage: `<StatisticsCard
  title="Monthly active users"
  value="125,430"
  change={12.5}
  changePeriod="vs last month"
  icon={Users}
/>`,
    props: [
      { name: "title", type: "string", required: true, description: "Metric name." },
      { name: "value", type: "string | number", required: true, description: "The number to show." },
      { name: "change", type: "number", description: "Percentage change; positive, negative or zero sets the trend." },
      { name: "changePeriod", type: "string", default: `"from last month"`, description: "What the change compares against." },
      { name: "description", type: "string", description: "Extra line under the value." },
      { name: "icon", type: "LucideIcon", description: "Icon next to the title." },
      { name: "iconColor", type: "string", default: `"text-primary"`, description: "Tailwind classes for the icon color." },
      { name: "prefix", type: "string", default: `""`, description: "Text before the value, such as $." },
      { name: "suffix", type: "string", default: `""`, description: "Text after the value, such as %." },
      ROOT_PROPS("div"),
    ],
    a11y: ["The trend arrow has a visually hidden label, so the direction is not conveyed by color alone."],
  },
  "blog-card": {
    narrow: true,
    preview: (
      <BlogCard
        title="Building a landing page in an afternoon"
        excerpt="Pick the sections you need, install them with one command and spend the rest of the day on copy."
        author="Sarah Wilson"
        date="2026-01-15"
        readTime="5 min read"
        category="Guide"
        image="/demo/blog-cover.webp"
        className="w-full max-w-sm"
      />
    ),
    importLine: `import { BlogCard } from "@/components/custom/blog-card";`,
    usage: `<BlogCard
  title="Building a landing page in an afternoon"
  excerpt="Pick the sections you need and install them."
  author="Sarah Wilson"
  date="2026-01-15"
  readTime="5 min read"
  category="Guide"
  image={post.coverUrl}
  href="/blog/landing-page"
/>`,
    props: [
      { name: "title", type: "string", required: true, description: "Post title." },
      { name: "excerpt", type: "string", required: true, description: "Short summary." },
      { name: "author", type: "string", required: true, description: "Author name." },
      { name: "date", type: "string", required: true, description: "Publish date." },
      { name: "readTime", type: "string", description: "Such as “5 min read”." },
      { name: "image", type: "string", description: "Cover image, rendered with next/image." },
      { name: "authorAvatar", type: "string", description: "Author image URL." },
      { name: "href", type: "string", description: "Where the card links to." },
      { name: "category", type: "string", description: "Category badge text." },
      { name: "categoryColor", type: "string", default: `"bg-gray-100 text-gray-800"`, description: "Tailwind classes for the badge." },
      { name: "likes", type: "number", description: "Like count." },
      { name: "variant", type: `"default" | "horizontal" | "minimal"`, default: `"default"`, description: "Layout." },
      { name: "onClick", type: "() => void", description: "Click handler. Needs a client component parent." },
      ROOT_PROPS("article"),
    ],
    a11y: ["Renders as an <article> with the date in a <time> element.", "Like counts read as “N likes”."],
  },
  "interactive-card": {
    narrow: true,
    preview: (
      <InteractiveCard
        title="Starter kit"
        description="Everything you need to launch, in one card."
        badge="Popular"
        actionText="Open"
        className="w-full max-w-sm"
      >
        <p className="text-sm text-muted-foreground">Put any content here: a list, an image or a form.</p>
      </InteractiveCard>
    ),
    importLine: `import { InteractiveCard } from "@/components/custom/interactive-card";`,
    usage: `<InteractiveCard
  title="Starter kit"
  description="Everything you need to launch."
  badge="Popular"
  actionText="Open"
>
  <p>Any content goes here.</p>
</InteractiveCard>`,
    props: [
      { name: "title", type: "string", required: true, description: "Card title." },
      { name: "description", type: "string", required: true, description: "Line under the title." },
      { name: "children", type: "ReactNode", description: "Custom content in the card body." },
      { name: "badge", type: "string", description: "Optional badge text." },
      { name: "badgeVariant", type: `"default" | "secondary" | "destructive" | "outline"`, default: `"default"`, description: "Badge style." },
      { name: "actionText", type: "string", description: "Button text; no button when omitted." },
      { name: "onAction", type: "() => void", description: "Called when the button is clicked. Needs a client component parent." },
      { name: "hoverEffect", type: "boolean", default: "true", description: "Lift the card on hover." },
      ROOT_PROPS("div"),
    ],
    a11y: ["The action button is described by the card title, so “Open” is announced with its context."],
  },
};

// Hero variants live in _content-heroes.tsx to keep this file readable.

export const DOCS: Record<string, SectionDoc> = { ...BASE_DOCS, ...HERO_DOCS };
