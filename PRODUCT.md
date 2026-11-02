# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: indie SaaS founders and indie hackers building on Next.js + shadcn/ui. They have a working product (or a weekend prototype) and need a credible marketing/landing site fast, without a designer and without fighting a heavy animation library. They evaluate by copying one section in, checking it matches their shadcn theme, and shipping.

## Product Purpose
Tapas UI is a free, open-source collection of copy-paste landing-page sections ("small plates") and full page templates, installed with the shadcn CLI (`npx shadcn@latest add https://tapas-ui.vercel.app/r/<name>.json`). The user owns the code. Success over the next three months is open-source growth: GitHub stars, real installs, and outside contributors. Paid Pro templates may come later, after traction; nothing is sold today.

## Positioning
Between shadcn/ui blocks (app UI, plain) and animation-first libraries such as Aceternity UI and Magic UI (flashy, harder to theme). Tapas sections are marketing-focused, inherit the user's shadcn theme tokens, stay accessible, and render as server components by default.

## Operating Context
- Install via shadcn registry JSON served from `public/r/*.json` (built by `shadcn build`).
- Users run Next.js App Router with Tailwind and shadcn tokens (`--primary`, `--muted`, etc.).
- Docs and previews live on the Tapas site (`/blocks`, card gallery); repo `tahmidbintaslim/tapas-ui`, deployed on Vercel at `tapas-ui.vercel.app`.

## Capabilities and Constraints
- Today: 6 cards (interactive, pricing, statistics, testimonial, feature, blog) and landing blocks (hero, faq, cta-banner, logo-cloud, footer; navbar and bento-grid in PR #19).
- Sections must work as React Server Components; only interactive bits are client components.
- Dependencies stay minimal (lucide-react, shadcn primitives). No required animation library.
- Undecided: the full section list for v1, which page templates ship first, Storybook setup.

## Brand Commitments
- Name: Tapas UI (renamed from Unicorn UI). Tagline in use: "Small plates for your landing page."
- MIT license.

## Evidence on Hand
- Live registry install verified (`npx shadcn add https://tapas-ui.vercel.app/r/hero.json`).
- No testimonials, user counts, logos of customers, or download numbers exist yet. Do not fabricate any.

## Product Principles
1. Copy, own, ship: every section is a single install and readable code the user can edit.
2. Your theme, not ours: sections use shadcn tokens so they match the host app.
3. Marketing-grade by default: real layouts founders need (hero, pricing, proof, FAQ, CTA), not demos.
4. Accessible and server-first: semantic HTML, keyboard and screen-reader friendly, minimal client JS.

## Accessibility & Inclusion
WCAG 2.2 AA for every section, in light and dark themes.

## Brand Commitments (visual, confirmed 2026-11-02)
- Owner chose the category-standard SaaS look, played straight. Quality bar: ui.shadcn.com, magicui.design, ui.aceternity.com, linear.app / vercel.com.
