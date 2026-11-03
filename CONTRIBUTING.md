# Contributing to Tapas UI

Issues and pull requests are welcome. This file covers setup, the checks a pull
request must pass, and how a card is laid out.

## Setup

You need Node.js 22 (22.13 or later), 24, or 26 and later, and pnpm. Use pnpm
only: the lockfile and the security overrides in `pnpm-workspace.yaml` are pnpm's,
and npm ignores them.

```bash
git clone https://github.com/<your-username>/tapas-ui.git
cd tapas-ui
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Checks

CI runs these on every push and pull request to `main`. Run them locally
first:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Then open the demo and check your change in both the light and dark themes and
at phone width (about 390px). No page should scroll sideways.

## Card and block structure

```
src/components/custom/your-card/
├── index.ts              # Re-exports the card
├── your-card.tsx         # The component
└── your-card.test.tsx    # Vitest + Testing Library tests
```

Follow the existing cards:

- Extend `React.ComponentProps<"div">` (or the root element's props), spread
  the rest props onto the root so `ref`, `id`, `aria-*` and `data-*` reach it,
  and merge `className` last with `cn()`.
- Use theme tokens (`text-muted-foreground`, `bg-muted`, `text-success`), not
  fixed colors such as `text-gray-500`, so both themes keep WCAG AA contrast.
- Use semantic elements (lists, `figure`, `time`, real `button` and `a`), hide
  decorative icons with `aria-hidden="true"`, and never nest a button inside a
  link.
- Format numbers and dates with a fixed locale so the server and the browser
  render the same text.
- Add tests for the behavior a screen reader user depends on, export the
  component from `src/components/custom/index.ts`, and add a
  `<name>.stories.tsx` file next to it.
- Add an entry to `registry.json` (list shadcn primitives in
  `registryDependencies` and npm packages in `dependencies`) and a docs entry
  (preview, usage, props, accessibility notes) to `src/app/docs/_content.tsx`.
  The docs page and the sidebar pick it up from `registry.json`. `pnpm build` regenerates
  `public/r/`; check the item installs with
  `npx shadcn@latest add ./public/r/<name>.json` in a scratch project.
- A motion version is a second file, `<name>-motion.tsx`, with the same props
  as the plain one. It starts with `"use client"`, imports only from
  `motion/react`, and calls `useReducedMotion()`; with reduced motion on it
  renders exactly the plain layout. Never hide content before it animates
  (animate from `opacity: 0.001` only after mount), animate only transform,
  opacity, filter, clip-path and shadows, and give anything that moves for
  more than 5 seconds a visible pause control. Register it as `<name>-motion`
  with the plain item's URL in `registryDependencies` and `motion` in
  `dependencies`, and add a `motion` entry to its docs content.
- Blocks must work in server components: no hooks or browser APIs in the block
  itself. Prefer native elements (details/summary) over client state.

## Templates

Templates live in `src/components/templates/<name>/`:

- `content.tsx`: the sample copy, fictional and labelled. No real customers,
  prices, star counts or benchmarks.
- `<name>-layout.tsx`: the page, written against a `ui` map of section
  components, so it never imports a plain or motion section directly.
- `<name>.tsx` and `<name>-motion.tsx`: entry points that pass plain or motion
  sections into the layout and merge the `content` prop over the sample copy.

Import sections by file (`@/components/custom/faq/faq`), not by folder: the
shadcn CLI installs the files but not the `index.ts`. Register `template-<name>`
(listing every plain section it uses in `registryDependencies`) and
`template-<name>-motion`, add the slug to `src/app/_site/templates.ts`, and add
`src/app/templates/<name>/page.tsx` and `.../motion/page.tsx`. A test checks the
registry items and routes exist.

Anything passed from a server page to a motion section must be serializable:
pass icons as elements (`icon: <Zap />`), not components (`icon: Zap`).

## Pull requests

- Branch from `main` and use conventional commit messages, for example
  `feat(pricing-card): add a yearly toggle` or `fix(blog-card): keep the date
  in UTC`.
- Describe what changed and how you checked it, and add a screenshot for
  visual changes.
- Keep sample content clearly fictional. Do not write quotes that praise this
  project.

## Bug reports and ideas

Use the issue templates. For a bug, include the card, the steps to reproduce,
what you expected, what happened, and your browser and OS.
