# Copilot Instructions

<!-- Workspace-specific instructions for Copilot. See https://code.visualstudio.com/docs/copilot/copilot-customization -->

## Project context

Unicorn UI is a Next.js 15 app that showcases six card components built with
React 19, TypeScript and Tailwind CSS 4 on shadcn/ui primitives. The cards are
meant to be copied into other shadcn/ui projects. Use pnpm.

## Code standards

- TypeScript strict mode; give every prop a type and a JSDoc comment.
- Style with Tailwind and the theme tokens in `src/app/globals.css`
  (`text-muted-foreground`, `bg-muted`, `text-success`), not fixed colors.
- Accessibility: semantic elements, `aria-hidden` on decorative icons, no
  button nested inside a link, information never conveyed by color alone.
- Spread rest props onto the root element so `ref`, `id`, `aria-*` and
  `data-*` reach it, and merge `className` last with `cn()`.

## Component structure

Each card lives in `src/components/custom/<name>/`:

- `index.ts`: re-exports the card
- `<name>.tsx`: the component
- `<name>.test.tsx`: Vitest + Testing Library tests

## Checks

`pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` must pass; CI runs
the same.
