# Unicorn UI

**Live demo (working demo):** https://shadcn-ui-library.vercel.app

Six card components for marketing and SaaS pages (interactive, pricing,
statistics, testimonial, feature and blog), built with React, TypeScript and
Tailwind CSS on top of [shadcn/ui](https://ui.shadcn.com/) primitives. The repo
is a Next.js app that shows each card with a live preview and copy-paste code.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## Status

- Working demo. It is not published to npm and has no releases yet.
- To use a card, copy its folder from `src/components/custom/` into a Next.js
  app that has shadcn/ui set up, plus the primitives it imports
  (`card`, `button`, `badge`). The pricing and statistics cards also use the
  `--success` color: copy `--success` from the `:root` and `.dark` blocks and
  `--color-success` from the `@theme inline` block in `src/app/globals.css`.
- CI runs lint, typecheck and build. There are no automated tests yet.

## What is in the box

| Component | What it shows |
| --- | --- |
| Interactive card | Title, description, optional badge, custom content and an action button |
| Pricing card | Plan name, price, a list of included and not included features, a call to action |
| Statistics card | A metric with an optional icon and a percentage change (up, down or no change) |
| Testimonial card | A quote with author, role, company, optional avatar and a star rating |
| Feature card | An icon, title, description, optional badge and call to action, vertical or horizontal |
| Blog card | Title, excerpt, author, date, read time, category and likes, in three layouts |

## Accessibility

What the cards do today:

- Every card forwards `ref` and root props (`id`, `aria-*`, `data-*`, event
  handlers) to its root element. On the testimonial card, `role` is the
  author's job title, so it is not passed to the root.
- Pricing features are a real list, and each item tells screen readers whether
  it is included; the check and cross icons are hidden from them.
- The statistics trend is announced in words ("Up", "Down", "No change"), not by
  color or icon alone, and its colors meet WCAG AA contrast in both themes.
- Testimonials use `figure`, `blockquote` and `figcaption`; the stars are one
  image labeled "Rated N out of 5".
- The blog card is an `article` with a `time` element. When it has `href` or
  `onClick`, the title is its only control and the whole card is clickable;
  there is no button nested inside a link.
- Decorative icons are `aria-hidden`, and avatars next to a visible name use
  empty alt text.

Interactive behavior beyond that comes from the shadcn/ui and Radix UI
primitives. The cards have not been tested with screen readers yet.

## Quick start

Requires Node.js 20.9 or later and pnpm 10 (the version is pinned in
`package.json`; `corepack enable` picks it up).

```bash
git clone https://github.com/tahmidbintaslim/unicorn-ui.git
cd unicorn-ui
corepack enable
pnpm install
pnpm dev
```

Then open the URL that `pnpm dev` prints (port 3000 by default).

### Scripts

- `pnpm dev`: start the development server with Turbopack
- `pnpm build`: build for production
- `pnpm start`: serve the production build
- `pnpm lint`: run ESLint
- `pnpm typecheck`: run the TypeScript compiler without emitting files

## Usage

### Interactive card

```tsx
import { InteractiveCard } from "@/components/custom/interactive-card";

<InteractiveCard
  title="Product launch"
  description="Join us for the launch event."
  badge="Live"
  badgeVariant="destructive"
  hoverEffect={true}
  actionText="Register now"
  onAction={() => alert("Registration clicked!")}
/>;
```

### Pricing card

```tsx
import { PricingCard } from "@/components/custom/pricing-card";

<PricingCard
  name="Pro Plan"
  description="For growing teams"
  price={29}
  currency="$"
  period="month"
  features={[
    { text: "Unlimited projects", included: true },
    { text: "Priority support", included: true },
    { text: "Advanced analytics", included: true },
    { text: "Custom integrations", included: false },
  ]}
  ctaText="Start free trial"
  popular={true}
  onSelect={() => alert("Plan selected!")}
/>;
```

### Statistics card

```tsx
import { StatisticsCard } from "@/components/custom/statistics-card";
import { DollarSign } from "lucide-react";

<StatisticsCard
  title="Total revenue"
  value={45231}
  prefix="$"
  change={20.1}
  changePeriod="from last month"
  icon={DollarSign}
/>;
```

### Testimonial card

```tsx
import { TestimonialCard } from "@/components/custom/testimonial-card";

<TestimonialCard
  testimonial="Your customer's quote goes here."
  author="Alex Chen"
  role="Frontend developer"
  company="Example Inc"
  rating={5}
  variant="elevated"
/>;
```

### Feature card

```tsx
import { FeatureCard } from "@/components/custom/feature-card";
import { BarChart3 } from "lucide-react";

<FeatureCard
  title="Advanced analytics"
  description="See how each page performs."
  icon={BarChart3}
  badge="Popular"
  ctaText="Explore analytics"
  onCtaClick={() => alert("Analytics clicked!")}
  hoverEffect={true}
/>;
```

### Blog card

```tsx
import { BlogCard } from "@/components/custom/blog-card";

<BlogCard
  title="Building modern UI components"
  excerpt="How to build reusable UI components with TypeScript."
  author="Sarah Wilson"
  date="2024-01-15"
  readTime="8 min read"
  category="React"
  likes={127}
  href="/blog/building-modern-ui-components"
/>;
```

The names, quotes and numbers in these examples and in the demo are sample
content.

### Customization

Each card accepts a `className` that is merged onto its root element with
`tailwind-merge`, so your classes win over the defaults:

```tsx
<InteractiveCard
  title="Custom styled card"
  description="This card has custom styling"
  className="bg-primary text-primary-foreground border-0"
/>
```

The blog card is the exception: its root is an `<article>` that wraps the
card, so `className` there sets layout (width, margin, grid placement) and does
not restyle the card surface. Use `variant` for that, or edit the copied file.

Colors come from the shadcn/ui CSS variables in `src/app/globals.css`, plus a
`--success` variable for positive states. Light and dark themes are switched
with `next-themes`.

## Known limitations

- `BlogCard` and `TestimonialCard` render images with `next/image`, so they need
  Next.js, and remote image URLs must be allowed in `images.remotePatterns` in
  `next.config.ts`.
- On the demo home page, the sample testimonial avatar and blog image point to
  `/api/placeholder/...`, which does not exist, so they do not load.
- The Playground tab on five of the six detail pages is a placeholder.

## Project structure

```
src/
├── app/
│   ├── components/          # Gallery and one detail page per card
│   ├── globals.css          # Theme variables and Tailwind setup
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── custom/              # The six cards
│   │   ├── interactive-card/
│   │   ├── pricing-card/
│   │   ├── statistics-card/
│   │   ├── testimonial-card/
│   │   ├── feature-card/
│   │   ├── blog-card/
│   │   └── index.ts
│   └── ui/                  # shadcn/ui primitives and the theme toggle
└── lib/utils.ts             # cn() class name helper
```

## Deployment

The demo is a standard Next.js app. On Vercel, import the repository and it
detects Next.js. Anywhere else:

```bash
pnpm build
pnpm start
```

No environment variables are needed.

## Contributing

Issues and pull requests are welcome. Run `pnpm lint`, `pnpm typecheck` and
`pnpm build` before opening a pull request; CI runs the same checks. See
[CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT, see [LICENSE](LICENSE). The shadcn/ui code in this repository is also MIT
licensed; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the primitives and theme variables
  these cards are built on
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [Next.js](https://nextjs.org/) for the framework
