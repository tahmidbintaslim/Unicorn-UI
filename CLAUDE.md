# Tapas UI: notes for AI coding agents

## Storybook MCP first

`pnpm storybook` serves a Storybook MCP server at `http://localhost:6006/mcp`
(`@storybook/addon-mcp`); `.mcp.json` registers it for Claude Code. With
Storybook running:

- Before creating or editing a component or story, call
  `get-storybook-story-instructions` and follow it.
- Look up props and usage with `docs-list` / `docs-show` / `docs-show-story`.
  Never guess a component's props from memory, and reuse an existing section
  before writing a new one.
- After a change, check the stories with `stories-preview` and the
  Accessibility panel; axe violations fail the a11y check.

## Project rules

- Read `PRODUCT.md` (who this is for, what not to claim) and `CONTRIBUTING.md`
  (section structure, plain vs motion rules) before UI work.
- Every section has a plain file (server component, CSS only) and, where motion
  adds meaning, a `<name>-motion.tsx` client file with the same props. Motion
  versions follow reduced motion, never hide content before it animates, and
  give anything that moves for more than 5 seconds a visible pause control.
- Use shadcn tokens (`primary`, `muted`, `card`, `border`) in sections, never
  the site's `brand` token or fixed colors.
- Register each item in `registry.json` with every package it imports in
  `dependencies` (a test checks this), add a docs entry and stories.
- Sample content is fictional and labelled. No invented customers, star
  counts, prices or benchmarks.
- Checks: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
