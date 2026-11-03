# Round 1: Motion tier, hero pack and interactive site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an optional motion version to every hero, ship 9 new heroes (plain and motion each), and make the Tapas website itself interactive.

**Architecture:**
- **Two items per hero:** every hero is a plain server component plus a `*-motion` client component with the same props. The motion registry item depends on the plain one through `registryDependencies`, and imports its prop types.
- **Docs:** the docs read `registry.json` and pair `<name>` with `<name>-motion` into one page, with a Plain/Motion switch.
- **Site motion:** the website uses `motion/react` freely. Registry sections never import site code.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind v4, shadcn registry, `motion` (motion.dev), Vitest + Testing Library, Storybook 9.

**Spec:** `docs/superpowers/specs/2026-11-03-motion-heroes-pro-design.md` (sections 1–3).

## Global Constraints

- **`motion` versions:** the site's `package.json` pins `"motion": "14.3.0"` (the newest release at least two weeks old). Registry items list `"motion"` unpinned in `dependencies`.
- **Plain files:** CSS only, no `"use client"`, no hooks, no `motion` import. They must render in a React Server Component.
- **Motion files:** start with `"use client"` and import from `motion/react` only. They call `useReducedMotion()`. When it returns true they render exactly the plain layout with no animation.
- **Visible without JavaScript:** no motion `initial` state may hide content. Animate from `opacity: 0.001`/`y` offsets only after mount, via `useMounted()` (Task 1). Server HTML must contain every heading, paragraph and action, visible.
- **Allowed properties:** only transform, opacity, filter, clip-path, background-position and box-shadow animate.
- **Easing:** `[0.16, 1, 0.3, 1]` (expo-out), durations 0.4–0.8s, at most one orchestrated entrance per section.
- **Theme:** sections use shadcn tokens only (`primary`, `muted`, `card`, `border`…). Never the site's `brand` token.
- **Accessibility:**
  - One `h1` per hero.
  - Actions are real `<a>`/`<button>`.
  - Decorative motion layers are `aria-hidden="true"`.
  - Anything that auto-moves for more than 5 s has a visible pause control (WCAG 2.2.2).
- **Copy:** sample content is fictional and labelled where it could pass as real. No invented star counts, customers or prices presented as Tapas facts.
- **Registry naming:** `hero-split` / `hero-split-motion`, title `"Hero: split"` / `"Hero: split (motion)"`.
- **Commits:** end every commit with the session's Co-Authored-By and Claude-Session lines.

## Review Focus

1. **Reduced motion is on.** Every motion hero renders its plain layout with no animated styles. Each hero task has a `reduced motion renders plain` test.
2. **Server render and no JavaScript.** Motion heroes' server HTML shows all text, so no `opacity:0` sits on headings. Each hero task has an `SSR output is visible` test using `renderToString`.
3. **GitHub API down or rate-limited.** The star button still renders "Star on GitHub" with no number and no error (Task 11 test).
4. **`hero-theme-cycle` given an `accentWord` not in `title`.** The title renders unchanged and nothing throws (Task 9 test).
5. **Marquee duplicates.** The cloned second copy of the items is `aria-hidden` and removed from tab order, so screen readers hear each logo once (Task 7 test).

---

## File structure

| Path | Responsibility |
|---|---|
| `src/components/custom/<hero>/<hero>.tsx` | Plain hero (server). |
| `src/components/custom/<hero>/<hero>-motion.tsx` | Motion hero (client). |
| `src/components/custom/<hero>/index.ts` | Exports both. |
| `src/components/custom/<hero>/<hero>.test.tsx` | Tests for both. |
| `src/components/custom/<hero>/<hero>.stories.tsx` | Stories: Plain, Motion, plus one variant story. |
| `src/components/custom/hooks/use-mounted.ts` | `useMounted(): boolean`. Registry item `use-mounted` (`registry:hook`), a registryDependency of every motion item. |
| `registry.json` | Two items per hero. |
| `src/app/_site/sections.ts` | Pairs plain and motion items into `SectionMeta` with `motionSlug?`, and adds `kind: "hero"`. |
| `src/app/docs/_content.tsx` | Plain docs entries. `DOCS[slug].motion?: MotionDoc`. |
| `src/app/docs/_variant-switch.tsx` | Plain/Motion radio switch (CSS-only show/hide). |
| `src/app/_site/reveal.tsx` | Site-only `<Reveal>` scroll entrance. |
| `src/app/_site/github-stars.ts` / `star-button.tsx` | Live star count (server) and the animated button (client). |
| `src/app/_landing/hero-canvas.tsx` | Grid canvas with pointer glow (client). |
| `src/app/_landing/page-builder.tsx` | Live mini page builder (client). |
| `src/app/_landing/playground.tsx` | Code-plus-preview playground (client). |
| `src/app/_landing/pricing.tsx` | Free vs Pro section ("Coming soon"). |

---

### Task 1: Motion infrastructure and `hero-motion`

**Files:**
- Modify: `package.json` (add `motion@14.3.0`), `vitest.setup.ts`, `registry.json`, `src/app/_site/sections.ts`, `src/app/docs/_content.tsx`, `src/app/docs/sections/[slug]/page.tsx`, `src/app/docs/_nav.tsx`, `src/components/custom/index.ts`
- Create: `src/components/custom/hooks/use-mounted.ts`, `src/components/custom/hero/hero-motion.tsx`, `src/app/docs/_variant-switch.tsx`
- Test: `src/components/custom/hero/hero.test.tsx`, `src/app/_site/sections.test.ts`

**Interfaces:**
- Produces:
  - `useMounted(): boolean`: false on the server and the first client render, true after an effect.
  - `HeroMotion(props: HeroProps)`: the same props as `Hero`.
  - `SectionMeta` gains `kind: "hero" | "block" | "card"` and `motionSlug?: string`. `SECTIONS` excludes `*-motion` items.
  - `MotionDoc { preview: ReactNode; importLine: string; usage: string; extraProps?: PropDoc[] }`, attached as `SectionDoc.motion?`.
  - `VariantSwitch({ name }: { name: string })`: renders radios `plain`/`motion`. CSS in `globals.css` shows `[data-variant="motion"]` blocks only when the motion radio is checked inside `.variant-scope`.
  - Test helpers in `vitest.setup.ts`: `window.matchMedia` mock (default no-preference), `IntersectionObserver` mock, and `mockReducedMotion(on: boolean)` exported from `src/test/motion.ts`.

- [ ] **Step 1: Failing tests**
  - `sections.test.ts`:
    - `pairs hero with hero-motion`: `getSection("hero")?.motionSlug === "hero-motion"`.
    - `hides motion items from SECTIONS`: no slug ends with `-motion`.
    - `classifies hero-* as hero`: `getSection("hero")?.kind === "hero"`.
  - `hero.test.tsx`:
    - `HeroMotion renders the same heading and links as Hero`.
    - `reduced motion renders plain`: with `mockReducedMotion(true)`, no element has an inline `transform` or `opacity` style.
    - `SSR output is visible`: `renderToString(<HeroMotion …/>)` contains the title and no `opacity:0`.
- [ ] **Step 2:** Run `pnpm vitest run src/components/custom/hero src/app/_site`. Expected: FAIL (module not found).
- [ ] **Step 3: Implement**
  - Add `motion` and `useMounted`.
  - `HeroMotion`: headline words rise in (stagger 0.04 s), description and buttons fade up after them, all gated by `useMounted() && !reduced`.
  - Registry entries:
    - `use-mounted`: type `registry:hook`, files `components/custom/hooks/use-mounted.ts`.
    - `hero-motion`: registryDependencies `["https://tapas-ui.vercel.app/r/hero.json", "https://tapas-ui.vercel.app/r/use-mounted.json"]`, dependencies `["motion"]`.
  - `sections.ts` pairing.
  - Docs page: render `VariantSwitch` beside the Preview/Code tabs when `section.motionSlug` exists. Each of preview, code, install command and usage renders once per variant, wrapped in `data-variant`.
  - Sidebar gets a "Heroes" group.
- [ ] **Step 4:** `pnpm lint && pnpm typecheck && pnpm test`. Expected: all pass.
- [ ] **Step 5:** `pnpm registry:build`. Expected: `public/r/hero-motion.json` and `public/r/use-mounted.json` exist.
- [ ] **Step 6:** Commit `feat(motion): plain/motion pairing, hero-motion, docs variant switch`.

### Hero tasks 2–10: the same shape

Each task creates the plain and motion files, index, test, stories, two registry items, two docs entries (plain `DOCS[slug]` and its `.motion`), and exports from `custom/index.ts`. Every task's test file contains:
- `<plain> renders heading, description and actions` (roles `heading` level 1, `link`).
- `reduced motion renders plain`.
- `SSR output is visible`.
- The task-specific tests listed.

Steps per task:
1. Write the tests.
2. Run `pnpm vitest run src/components/custom/<hero>` and expect FAIL.
3. Implement both files.
4. Run `pnpm lint && pnpm typecheck && pnpm test` and expect PASS.
5. Run `pnpm registry:build` and expect both JSON files.
6. Commit `feat(<hero>): plain and motion`.

Shared base props, exported from `hero/hero.tsx` and imported by every hero:
```ts
export interface HeroBaseProps { eyebrow?: string; title: string; description?: string; primaryAction?: HeroAction; secondaryAction?: HeroAction }
```

### Task 2: `hero-split`
- **Props:** `HeroSplitProps extends HeroBaseProps { media: React.ReactNode; mediaPosition?: "left" | "right" /* default "right" */ }`
- **Plain:** two columns from `lg`; stacks with the media below the copy on phones.
- **Motion:** media floats in (y 24 → 0) with a pointer tilt of at most ±6°, via `useMotionValue` + `useSpring`. The tilt is off on touch (`(pointer: fine)` only).
- **Tests:** `mediaPosition left puts media first in DOM order on lg`. Assert `flex-row-reverse` is absent on the left and present on the right.

### Task 3: `hero-command`
- **Props:** `HeroCommandProps extends Omit<HeroBaseProps, "secondaryAction"> { command: string; copyLabel?: string /* "Copy command" */ }`
- **Plain:** the command sits in a `<code>` box with a copy `<button>`. A tiny inline client island, `copy-button.tsx` in the same folder (part of both registry items), copies the text and announces "Copied" through `aria-live="polite"`.
- **Motion:** the command types itself (30 ms per character), with a blinking caret that hides after typing. The full command is always in the DOM as `sr-only`.
- **Tests:**
  - `copy button writes the command to the clipboard`: mock `navigator.clipboard.writeText` and assert it's called with `command`.
  - `screen readers get the full command immediately`.

### Task 4: `hero-spotlight`
- **Props:** `HeroBaseProps`.
- **Plain:** dark-tinted section with a CSS grid background (`bg-[linear-gradient…]` 40 px cells, `mask-image` radial fade) and a static radial glow in `primary`.
- **Motion:** the glow follows the pointer via CSS custom properties `--x/--y`, set in a `pointermove` handler throttled with `requestAnimationFrame`. It recenters on `pointerleave`.
- **Tests:** `grid layer is aria-hidden`.

### Task 5: `hero-showcase`
- **Props:** `HeroShowcaseProps extends HeroBaseProps { children: React.ReactNode /* the live component */ }`
- **Plain:** headline above a framed slot (`rounded-2xl border bg-card shadow`).
- **Motion:** the slot rises and scales from 0.96 once. Hover lifts it 4 px.
- **Tests:** `renders children inside the frame`.

### Task 6: `hero-waitlist`
- **Props:** `HeroWaitlistProps extends Omit<HeroBaseProps, "primaryAction" | "secondaryAction"> { action: string; method?: "post" | "get"; inputLabel?: string /* "Email address" */; buttonLabel?: string /* "Join the waitlist" */; note?: string }`
- **Plain:** a native `<form action method>` with a labelled `type="email"` `required` input and a submit button.
- **Motion:** adds `onSubmit?: (email: string) => Promise<void>`. If it's given, it prevents default and shows "Sending…" then "You're on the list." (the button morphs via `layout`). On rejection it shows "Something went wrong. Try again." in `role="alert"`.
- **Tests:**
  - `input has an accessible label`.
  - `motion: success message after onSubmit resolves`.
  - `motion: error message after onSubmit rejects`.

### Task 7: `hero-marquee`
- **Props:** `HeroMarqueeProps extends HeroBaseProps { items: { name: string; logo?: React.ReactNode }[]; speed?: number /* seconds per loop, default 30 */ }`
- **Plain:** items wrap in a centered row.
- **Motion:** two copies on an infinite `x: 0 → -50%` loop. The second copy is `aria-hidden` and `inert`. A pause/play `<button aria-pressed>` is shown, and the loop also pauses on hover and on focus within.
- **Tests:**
  - `second copy is aria-hidden and inert`.
  - `pause button toggles aria-pressed`.

### Task 8: `hero-video`
- **Props:** `HeroVideoProps extends HeroBaseProps { poster: string; posterAlt: string; videoSrc: string; captionsSrc?: string }`
- **Plain:** `<video controls preload="none" poster>`, with a `<track kind="captions">` when `captionsSrc` is set.
- **Motion:** the poster is a `<button aria-label="Play video: {posterAlt}">` that scales into the player (`layoutId`), then calls `video.play()`.
- **Tests:**
  - `plain renders a video with controls`.
  - `motion play button has a descriptive label`.
- **Docs and stories:** use `/demo/blog-cover.webp` as the poster and a public-domain sample clip URL documented in a comment (no autoplay).

### Task 9: `hero-theme-cycle` (unique)
- **Props:** `HeroThemeCycleProps extends HeroBaseProps { accentWord: string; themes?: { name: string; primary: string; primaryForeground: string }[] /* default: the 5 swatch themes */; interval?: number /* ms, default 2500 */ }`
- **Plain:** `accentWord` is wrapped in `text-primary`. No cycling.
- **Motion:**
  - Every `interval` it sets `--primary`/`--primary-foreground` on the section, so the accent word, buttons and badge all re-theme, with a cross-fade on the word.
  - A visible Pause/Play button is shown (`aria-pressed`, label "Pause color cycling").
  - It stops on hover, on focus within and on reduced motion.
- **Tests:**
  - `accentWord missing from title renders title unchanged` (Review Focus 4).
  - `cycles to the next theme after interval`: fake timers; the section style `--primary` changes.
  - `pause stops cycling`.

### Task 10: `hero-plates` (unique)
- **Props:** `HeroPlatesProps extends HeroBaseProps { plates: { label: string; content?: React.ReactNode }[] /* 3–6 */ }`
- **Plain:** headline beside a vertical stack of labelled plate cards, slightly overlapped, as a static page mock.
- **Motion:** `useScroll({ target, offset: ["start end", "end start"] })`. Each plate slides in from alternating sides and settles into the stack as the section scrolls. A final "page" outline fades in.
- **Tests:**
  - `renders one plate per item in order`.
  - `plates are a list` (`role="list"` with N `listitem`).

### Task 11: Site motion foundations: `Reveal` and live stars

**Files:**
- Create:
  - `src/app/_site/reveal.tsx`
  - `src/app/_site/github-stars.ts`
  - `src/app/_site/star-button.tsx`
  - `src/app/_site/github-stars.test.ts`
- Modify: `site-header.tsx`, `site-footer.tsx`, `src/app/page.tsx` (wrap each landing section's inner content in `<Reveal>`)

**Interfaces:**
- `Reveal({ children, delay?: number, className?: string })`: a client component that fades and rises 16 px once in view (`whileInView`, `viewport={{ once: true, amount: 0.2 }}`). It is static under reduced motion and content stays visible before mount.
- `getStarCount(): Promise<number | null>`: `fetch("https://api.github.com/repos/tahmidbintaslim/tapas-ui", { next: { revalidate: 3600 }, headers: { Accept: "application/vnd.github+json" } })`. It returns `stargazers_count`, or `null` on a non-OK response or a thrown error.
- `StarButton({ count }: { count: number | null })`: a link to `GITHUB_URL` with a GitHub icon and "Star on GitHub". When `count` is a number it adds a pill with `count.toLocaleString("en-US")` and `aria-label="{n} stars"`; the pill pops in (scale 0.6 → 1) keyed on `count`.

- [ ] **Step 1: Tests**
  - `getStarCount returns stargazers_count` (mock fetch 200 `{stargazers_count: 42}` → 42).
  - `returns null on 403` (Review Focus 3).
  - `returns null when fetch throws`.
  - `StarButton without count shows no number`.
- [ ] **Step 2:** Run the tests and expect FAIL.
- [ ] **Step 3:** Implement. Header and footer become async server components that call `getStarCount()`.
- [ ] **Step 4:** Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build` and expect PASS. Run the build with network blocked too: `pnpm build` must still succeed when the fetch fails.
- [ ] **Step 5:** Commit `feat(site): scroll reveals and live GitHub star count`.

### Task 12: Landing hero canvas and live page builder

**Files:**
- Create: `src/app/_landing/hero-canvas.tsx`, `src/app/_landing/page-builder.tsx`, `src/app/_landing/page-builder.test.tsx`
- Modify: `src/app/page.tsx` (replace the current hero and `ThemeShowcase`)
- Delete: `src/app/_landing/theme-showcase.tsx`, after moving its demo content into the builder

**Interfaces:**
- `HeroCanvas({ children })`: dark grid background with a pointer-following glow in `brand` (same technique as Task 4, site-only). Children sit on top.
- `PageBuilder()`:
  - **Chips:** a toggle group (`role="group"`, `aria-label="Sections on the example page"`) of `<button aria-pressed>` chips: Navbar, Hero, Logo cloud, Pricing, FAQ, CTA, Footer. Navbar, Hero and Pricing start on.
  - **Theme:** the existing `ThemeSwatches` row (name `builder-theme`) re-themes the preview.
  - **Preview:** a framed `light theme-demo` that renders the real Tapas components for the enabled chips. Each one is wrapped in `motion.div layout` with enter and exit animations (`AnimatePresence`), and the preview is `inert`.
  - **Hero layout:** a small select switches the preview's hero between Plain and the `hero-split` layout.
  - **Empty state:** when every chip is off, the preview reads "Add a section to start your page." (it is not blank).
- **Hero copy:**
  - Headline unchanged.
  - Primary button "Get started (free)" → `/docs/installation`.
  - Secondary: the copyable `npx shadcn@latest add …/r/hero.json` command, using the existing `CopyCommand`.
  - The star button.

- [ ] **Step 1: Tests**
  - `toggling a chip adds and removes its section` (`aria-pressed` flips; the section's text appears or disappears).
  - `all chips off shows the empty state`.
  - `chips are buttons in a labelled group`.
- [ ] **Step 2:** Run the tests and expect FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run `pnpm lint && pnpm typecheck && pnpm test` and expect PASS. Start the server and take Playwright screenshots at 1440 and 390 (`node <scratchpad>/shots/shoot.js`) with horizontal overflow 0.
- [ ] **Step 5:** Commit `feat(site): interactive hero with live page builder`.

### Task 13: Playground section

**Files:**
- Create: `src/app/_landing/playground.tsx`, `src/app/_landing/playground-data.ts`, `src/app/_landing/playground.test.tsx`
- Modify: `src/app/page.tsx` (insert after "How it works")

**Interfaces:**
- `PLAYGROUND: { slug: string; label: string; plain: (p: PlaygroundState) => ReactNode; motion: (p: PlaygroundState) => ReactNode; code: (p: PlaygroundState, variant: "plain" | "motion") => string }[]`. Entries are `hero`, `hero-split`, `hero-command`, `hero-spotlight` and `hero-theme-cycle`.
- `PlaygroundState { slug: string; variant: "plain" | "motion"; theme: ThemeName; density: "compact" | "comfortable"; replayKey: number }`.
- **Layout:**
  - Left column: tabs "component.tsx" (real source, passed from the server page as props via `readFileSync` so the client bundle doesn't import fs) and "usage.tsx" (from `code()`, so it updates live).
  - Right column: the preview.
- **Controls:**
  - Variant select.
  - Plain/Motion segmented radio.
  - Theme swatches.
  - Density toggle (changes `py` on the preview wrapper and the `className` in the usage code).
  - "Replay" button (bumps `replayKey`, disabled on Plain).

- [ ] **Step 1: Tests**
  - `changing variant updates the usage code` (it contains `<HeroSplit`).
  - `motion toggle switches the import to the motion file`.
  - `density compact appears in the usage className`.
  - `replay disabled for plain`.
- [ ] **Step 2:** Run the tests and expect FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run the checks and expect PASS.
- [ ] **Step 5:** Commit `feat(site): live playground`. Close issue #17 in the PR body.

### Task 14: Pricing section, catalogue badges, hero gallery

**Files:**
- Create: `src/app/_landing/pricing.tsx`
- Modify: `src/app/page.tsx`, `src/app/_landing/section-sketch.tsx`, `src/app/docs/sections/page.tsx`

**Content and behavior:**
- **Pricing:** two `PricingCard`s.
  - **Free:** `$0`, period `"forever"`. Features: all sections in plain and motion, the shadcn CLI install, docs and Storybook. CTA "Browse sections".
  - **Pro:** price shown as "Coming soon" text, not a number, since the owner hasn't set one. Features: full page templates (motion and plain), premium motion sections, Figma kit, yearly updates. CTA "Join the waitlist", linking to the GitHub Discussions page or a waitlist issue. No invented price.
  - **Alternative:** if `PricingCard` needs a numeric price, render Pro as a custom card in the same style instead of misusing the prop.
- **Catalogue:** tiles of sections with `motionSlug` get a "Motion" badge. Add sketches for the new heroes. The menu grid shows a "Heroes" row first (5 heroes) above the other sections.
- **Docs index:** a "Heroes" group comes first.
- **Test:** `pricing shows no numeric Pro price` (no `$` in the Pro card).
- **Checks:** run them, then commit `feat(site): pricing section and hero gallery`.

### Task 15: Finish

- [ ] Update `README.md`: a "Heroes" table (10 rows, with plain and motion install commands) and a "Motion" section explaining the two tiers and reduced motion. Update `CONTRIBUTING.md` with the plain/motion rules (copy the Global Constraints bullets).
- [ ] Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`. Expected: PASS; the registry lists 13 + 1 + 9×2 + 1 = 33 items. `hero-motion` is the only "+1": `hero` already exists. `use-mounted` is the other "+1".
- [ ] Take screenshots at 1440 and 390 of `/`, `/docs/sections/hero-theme-cycle` and `/docs/sections/hero-plates`, in reduced-motion and normal modes. Overflow must be 0.
- [ ] Run the impeccable detector on the changed UI. Then run a fresh review subagent over the branch.
- [ ] Push and update PR #21's body with what shipped.
