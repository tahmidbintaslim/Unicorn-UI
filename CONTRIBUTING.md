# Contributing to Unicorn UI

Issues and pull requests are welcome. This file covers setup, the checks a pull
request must pass, and how a card is laid out.

## Setup

You need Node.js 22.13 or later and pnpm. Use pnpm only:
the lockfile and the security overrides in `pnpm-workspace.yaml` are pnpm's,
and npm ignores them.

```bash
git clone https://github.com/<your-username>/Unicorn-UI.git
cd Unicorn-UI
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

## Card structure

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
- Add tests for the behavior a screen reader user depends on, and add the card
  to `src/components/custom/index.ts`, the gallery and a detail page.

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
