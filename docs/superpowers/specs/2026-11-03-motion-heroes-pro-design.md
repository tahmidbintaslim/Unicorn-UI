# Tapas UI: motion tier, hero pack, interactive site and Pro

Status: draft for owner review · 2026-11-03

## What the owner decided

| Topic | Decision |
|---|---|
| Motion | Two tiers. Every section ships a **plain** version (CSS only, server component, no new deps) and an optional **motion** version. Templates come in a motion and a plain design. |
| First round | Hero pack plus motion and interactivity on the website. |
| Pro | Real Stripe checkout, built and tested in **test mode** first. Live payments only after the owner says so. |
| Pricing model | Yearly subscription. |
| Pro contents | Full page templates, premium motion sections, Figma kit. |
| Accounts | Supabase: GitHub sign-in and Postgres. |

Not changing: sections keep shadcn tokens, accessibility (WCAG 2.2 AA) and copy-paste ownership. No invented social proof: star counts are live numbers, never "1,200+ developers" unless that is the real count.

## 1. Motion tier (architecture)

- **Library:** `motion` (motion.dev, formerly Framer Motion), imported from `motion/react`. It is what Aceternity UI and Magic UI build on, so visitors know it.
- **Two registry items per section:** `hero-split` (plain) and `hero-split-motion` (motion). Both take the same content props. The motion item adds `registryDependencies: ["https://tapas-ui.vercel.app/r/hero-split.json"]` and imports the prop types from the plain file, so one install of the motion item brings both and they never drift.
- **Motion rules:** every motion component respects `prefers-reduced-motion` (via `useReducedMotion`) and falls back to the plain render, content is visible before animation starts (no hidden-until-JS text), and only transform, opacity, filter and clip-path animate.
- **Docs:** each section page gets a **Plain | Motion** switch on the preview. The install command, Code tab and props table follow the switch.
- **Existing 13 items** get motion versions in round 3 (see Rounds); round 1 sets up the pattern with the hero pack.

## 2. Hero pack (round 1)

Each one ships plain and motion. "Motion" says what moves.

| Item | Plain | Motion |
|---|---|---|
| `hero` (existing, centered) | as today | words rise in, buttons fade up |
| `hero-split` | copy left, product image or any component right | image floats in with a slight tilt that follows the pointer |
| `hero-command` | headline plus a big install command with copy button | command types itself, cursor blinks, "Copied" morphs in |
| `hero-spotlight` | dark grid canvas with a static glow | glow follows the pointer across the grid |
| `hero-showcase` | headline over a slot for a live component | slot cards fan out and settle, hover lifts them |
| `hero-waitlist` | headline plus email field and submit | field focus glow, success state morphs from the button |
| `hero-marquee` | headline over a row of logos or screenshots | row scrolls endlessly, pauses on hover and focus |
| `hero-video` | headline plus poster image with a play button | poster scales into the player on click |

**Unique to Tapas:**

| Item | Idea |
|---|---|
| `hero-theme-cycle` | The headline's accent word cycles through color themes, and the whole hero re-themes with it. It shows "your theme, not ours" in one glance. |
| `hero-plates` | Section "plates" (nav, hero, pricing, footer) slide in and stack into a page as you scroll, then the finished page settles. It's the Tapas metaphor as a hero. |

Every hero takes its copy as props, renders one `h1`, keeps the primary action a real link or button, and is tested with Testing Library plus axe in Storybook.

## 3. Website motion and interactivity (round 1)

1. **Hero:** dark grid canvas with a pointer-following glow. Buttons are "Get started (free)" and the copyable install command. Inside the hero sits a **live mini page builder**: click section chips (Navbar, Hero, Pricing, FAQ, Footer) to add or remove them from a preview page, which re-lays out with layout animations. The theme swatches re-color it.
2. **Scroll reveals:** one orchestrated entrance per section (fade and rise, staggered children), never the same effect on everything. Off with reduced motion.
3. **Playground section:** two columns. Left: code tabs (`component.tsx`, usage) whose code updates live. Right: a preview. Controls switch variant, Plain/Motion, theme color, density, and replay the animation. Also on each docs page. This closes issue #17.
4. **Live GitHub stars:** a star button in the nav and footer shows the real count from `GET /repos/tahmidbintaslim/tapas-ui`. It's fetched on the server and revalidated hourly, with a small pop animation when the number changes. No OAuth needed to star; the button links to the repo.
5. **Component grid:** the catalogue tiles animate their sketches on hover, and a "Motion" badge marks sections with a motion version.
6. **Pricing section:** Free vs Pro (yearly) on the landing page and on `/pricing`, using the new pricing component. The Pro button goes to sign-in and checkout once round 2 ships; until then it says "Coming soon".

Performance budget: landing page JavaScript stays under about 150 kB first load, and motion code is loaded only by components that use it.

## 4. Pro (round 2, Stripe test mode)

**Plans**

- **Free:** every section in plain and motion, docs, Storybook and CLI install.
- **Pro (yearly):** full page templates (each in motion and plain), premium motion sections (canvas or WebGL backgrounds, 3D cards, scroll stories) and the Figma kit. The owner sets the price; a suggestion is $59/year solo and $149/year team.

**Flow**

1. Sign in with GitHub (Supabase Auth).
2. `/pricing` → Stripe Checkout in subscription mode (test mode).
3. `POST /api/webhooks/stripe` verifies the Stripe signature and handles these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`

   It updates the user's subscription row.
4. `/account` shows plan status, a Stripe billing-portal link, template downloads and a personal registry token.

**Delivery**

- **Private registry:** Pro items are served from `/r/pro/<name>.json` and need `Authorization: Bearer <token>`. shadcn supports this through `registries` in `components.json` with the token in an env var, so `npx shadcn add @tapas-pro/<name>` works for subscribers.
- **Zip downloads:** each template is also a zip download, behind a signed URL.
- **Figma kit:** a link on the account page.

**Data (Supabase Postgres, RLS on)**

- `profiles` (`id` → `auth.users`, `stripe_customer_id`, `subscription_status`, `current_period_end`, `plan`).
- `registry_tokens` (`user_id`, `token_hash`, `created_at`, `last_used_at`). Tokens are shown once and stored hashed.
- Only server routes use the service role key. Clients read their own row through RLS.

**Before live mode:** at least two templates and three premium sections exist, terms and refund pages are written, and the owner approves.

## 5. Rounds

| Round | Ships |
|---|---|
| 1 | `motion` dependency and the plain/motion registry pattern, 10 heroes (plain + motion), website hero with the live page builder, scroll reveals, playground, live stars, pricing section (Pro "Coming soon"). |
| 2 | Supabase auth, Stripe test-mode checkout, webhooks, billing portal, account page, private registry, first two Pro templates (motion + plain). |
| 3 | Variants plus motion versions for the other section types (navbar, features/bento, pricing, testimonials, stats, logo cloud, FAQ, CTA, footer); more templates; premium motion sections; Figma kit. |
| 4 | Go live after owner approval. |

## 6. Testing

- **Unit tests:** each component renders in plain and motion versions, with reduced motion falling back to plain and the content visible without JS.
- **Storybook:** a story per variant in light and dark, with the a11y addon set to error.
- **Playwright screenshots:** 1440px and 390px; no sideways scroll.
- **Round 2:**
  - The webhook handler is unit-tested with signed test payloads.
  - The end-to-end checkout runs with Stripe test cards (`4242…`) and test-mode events.
  - RLS policies are checked so a user can't read another user's row.

## 7. Needs from the owner

- **Stripe account:** which one to use. Available in test mode: "Devsaround" or "Personal (Substack)", or a new account named Tapas UI.
- **Supabase project:** your org already has two projects. A third may need a paid plan or pausing one; your call.
- **Prices:** for Pro solo and team.
- **GitHub OAuth app:** for Supabase sign-in, created under your GitHub account's developer settings. I'll give exact steps.
- **Figma kit:** a Figma seat that can edit and publish. The current seat is View-only.
- **Terms and refund policy:** before live mode.
