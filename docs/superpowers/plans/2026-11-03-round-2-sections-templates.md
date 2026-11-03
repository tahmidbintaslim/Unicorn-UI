# Round 2: 40+ sections, free templates, demo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Take Tapas from 22 to 44 plain sections, give the new ones motion versions where movement carries meaning, and ship three free full-page templates with live demos. That is the owner's bar before any npm, social or marketing launch.

**Architecture:**
- **Same pattern as round 1:** each section is a plain server component in `src/components/custom/<name>/<name>.tsx`. Its optional `<name>-motion.tsx` client file takes the same props.
- **Templates:** `registry:block` items. Each is one page component in `src/components/templates/<name>/<name>.tsx` that composes registry sections, and its registryDependencies are those sections' URLs.
- **Demos:** each template has a live route at `/templates/<name>`, with `?motion=1` for the motion version.

**Tech Stack:** as round 1 (Next.js 15, React 19, Tailwind v4, shadcn registry, `motion` 14.3.0, Vitest, Storybook 9).

**Spec:** `docs/superpowers/specs/2026-11-03-motion-heroes-pro-design.md` (§1 motion rules, §5 round 3 "variants for the other section types; more templates"). The owner moved this ahead of Pro: "at least 40 sections, proper demo, free templates".

## Global Constraints

All of round 1's constraints apply unchanged: plain = server component with no `motion` import; motion = `"use client"` and reduced motion renders plain; nothing hidden before it animates; one `h1` per page; real links and buttons; pause controls for anything that auto-moves for more than 5 s; fictional, labelled sample content; no invented claims.

New for round 2:
- **No hero props:** non-hero sections don't use `HeroBaseProps`. Their headings are `h2`.
- **Section heading props:** each section takes `title?: string` and `description?: string` plus its data props.
- **Registry kinds:** `kind` in `sections.ts` gains `"template"` for `registry:block` items. Templates are listed separately in the docs.

## Review Focus

1. **Empty data arrays** (`items: []`): every list section renders its heading and no empty `<ul>` chrome. Each section's test has `renders nothing extra for an empty list`.
2. **Pricing toggle without JavaScript:** the monthly/yearly switch on `pricing-table` works with CSS only (radio + `:has`), and the yearly price is visible when that radio is checked.
3. **Comparison table on phones:** it scrolls inside its own box (`overflow-x-auto`, focusable) and the page doesn't scroll sideways.
4. **Template routes:** each `/templates/<name>` has exactly one `h1`, and `?motion=1` swaps in motion sections without hydration errors.
5. **Long content:** very long titles and many items wrap without overflow at 390 px, checked in the screenshot round.

---

## New sections (22, bringing the total to 44)

| # | Name | Plain | Motion version |
|---|---|---|---|
| 1 | `pricing-table` | 2–4 plans, monthly/yearly radio switch (CSS only) | price digits roll on switch |
| 2 | `testimonials-wall` | masonry columns of quotes | columns drift slowly, pausable |
| 3 | `testimonial-highlight` | one large quote with an avatar | words fade in on view |
| 4 | `stats-band` | 3–4 big numbers with labels | numbers count up once in view |
| 5 | `feature-grid` | icon + title + text grid, 2–4 columns | tiles stagger in |
| 6 | `feature-rows` | alternating image/text rows | rows slide in from their side |
| 7 | `steps` | numbered how-it-works steps | connecting line draws as you scroll |
| 8 | `newsletter` | email form band (native form) | success morph via `onSubmit` |
| 9 | `integrations-grid` | logo tiles with names | hover lift and glow |
| 10 | `team` | people grid with role and links | — (plain only) |
| 11 | `comparison-table` | feature × plan table with check/x | — (plain only) |
| 12 | `changelog` | dated entries list | — (plain only) |
| 13 | `contact` | contact form plus details column | — (plain only) |
| 14 | `not-found` | 404 page section | the number tilts toward the pointer |
| 15 | `coming-soon` | launch countdown placeholder with signup | — (plain only; no fake timer) |
| 16 | `announcement-bar` | dismissible top bar (`<details>`-free, a client close island) | — |
| 17 | `navbar-floating` | pill navbar floating over content | shrinks on scroll |
| 18 | `footer-simple` | one-row footer | — |
| 19 | `cta-split` | CTA band with media | media floats in |
| 20 | `faq-two-column` | FAQ with an intro column | — |
| 21 | `blog-grid` | grid of `BlogCard`s with heading | cards stagger in |
| 22 | `social-proof` | avatar stack, rating and one line | avatars pop in |

That adds 22 plain and 13 motion items. Motion versions of the round-0 blocks and cards (navbar, logo cloud, bento, faq, cta, footer and the 6 cards) are Task 9.

## Templates (free)

| Template | Sections used | Demo route |
|---|---|---|
| `template-saas` | navbar, hero-split, logo-cloud, feature-grid, stats-band, testimonials-wall, pricing-table, faq, cta-banner, footer | `/templates/saas` |
| `template-waitlist` | navbar-floating, hero-waitlist, social-proof, feature-rows, faq-two-column, footer-simple | `/templates/waitlist` |
| `template-ai` | announcement-bar, navbar, hero-spotlight, feature-grid (bento-grid), steps, integrations-grid, comparison-table, pricing-table, cta-split, footer | `/templates/ai` |

Each template takes one `content` prop. Its typed copy object has every string the page shows, so users edit copy in one place. It also takes `motion?: boolean`, which picks the `-motion` sections. The registry item lists both variants of each section.

---

## Tasks

Each section task follows round 1's per-hero loop:
1. Write the tests (render, empty list, plus the specific ones listed).
2. Watch them fail.
3. Implement plain, then motion.
4. Write stories.
5. Add registry items (`registryDependencies` on shadcn primitives plus the plain item for motion).
6. Write the docs entry, in `src/app/docs/_content-sections.tsx`.
7. Run `pnpm lint && pnpm typecheck && pnpm test && pnpm registry:build`.
8. Commit.

Tasks are batched by theme:

### Task 1: Conversion sections
Sections: `pricing-table`, `comparison-table`, `cta-split`, `newsletter`.
- `pricing-table` tests:
  - `yearly radio shows yearly prices` (checking the radio sets the `data-period` CSS hook; both price sets are in the DOM, monthly visible by default).
  - `popular plan is marked for screen readers` ("Most popular" text).
- `comparison-table` test: `has a caption and row headers` (`th scope="row"`).

### Task 2: Proof sections
Sections: `testimonials-wall`, `testimonial-highlight`, `stats-band`, `social-proof`.
- `stats-band` motion test: `final numbers are in the DOM before counting` (the SSR text has the final values).
- `testimonials-wall` motion test: `pause button stops drift`.

### Task 3: Feature sections
Sections: `feature-grid`, `feature-rows`, `steps`, `integrations-grid`.
- `steps` test: `steps are an ordered list`.
- `feature-rows` test: `alternates media side`.

### Task 4: Company and content sections
Sections: `team`, `changelog`, `blog-grid`, `faq-two-column`, `contact`.
- `changelog` test: `dates use <time datetime>`.
- `contact` test: `every field has a label; form posts to action`.

### Task 5: Utility sections
Sections: `not-found`, `coming-soon`, `announcement-bar`, `navbar-floating`, `footer-simple`.
- `announcement-bar` test: `close button hides it and is labelled "Dismiss announcement"`.
- `navbar-floating` test: `links in nav aria-label Main`.

### Task 6: Docs and site wiring for 44 sections
- **Docs:** `sections.ts` grouping, with sidebar groups Heroes, Marketing, Proof, Features, Company, Utility and Cards (a `group` field derived from an explicit map). The docs index groups match. The landing catalogue shows 12 picks and links "View all 44 sections".
- **Sketches:** one per new section for the index tiles.
- **Test:** `every registry item has a docs entry`, which iterates SECTIONS and asserts `DOCS[slug]` exists.

### Task 7: Templates
- **Files:** `src/components/templates/{saas,waitlist,ai}/` (page component, `content.ts` default copy, test), registry `registry:block` items, routes `src/app/templates/[name]/page.tsx` (static params), and a `/templates` gallery page with thumbnails (sketch), Plain/Motion links and install commands.
- **Tests:**
  - `renders exactly one h1`.
  - `motion flag swaps in motion sections` (checks a motion-only `data-slot`).
  - `content prop overrides copy`.
- **Navigation:** the nav gets "Templates", and the footer Product column links it.

### Task 8: Demo
- **Landing:** the "Templates" section shows the three templates as browser-framed previews (screenshots generated at build would be heavy, so these are live scaled-down `iframe`s of `/templates/<name>` with `loading="lazy"` and a title attribute) and links to each demo.
- **Hero:** the page builder chips grow to include Testimonials, Stats and Features, using the new sections.

### Task 9: Motion versions for round-0 sections
Sections: `navbar` (hide on scroll down, show on scroll up), `logo-cloud` (fade-in stagger), `bento-grid` (tile stagger + hover), `faq` (smooth height on open via `motion` layout), `cta-banner` (sheen on hover), `footer` (none, so plain only; documented), and the 6 cards (hover lift and spring, counting number for statistics-card).
- **Tests:** the same three motion contract tests per item.

### Task 10: Finish
- **Docs:** README section count and tables, a Templates section, and CONTRIBUTING notes on templates.
- **Checks and screenshots:**
  - Full build.
  - Playwright round at 1440 and 390, reduced and normal, across `/`, `/templates/*` and 6 section docs: no overflow, no console errors.
  - The impeccable detector.
- **Review:** a fresh reviewer subagent, then a fix pass, then a PR, then merge on green (the owner authorized merging without asking).
