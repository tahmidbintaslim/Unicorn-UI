# Tapas UI masterplan

Owner's plan, adopted 2026-11-08. Status notes in *italics*.

## Positioning

"Landing pages that actually work on launch day, not just visual mockups, for indie SaaS founders and AI builders."

## Product and technical plan

- **Content-first:** each template and demo is driven by one typed `content.ts`, so a founder or an AI agent
  edits headlines, pricing, FAQs and metadata in one file. *Done for the Ledgerline demo
  (`src/app/examples/ledgerline/content.ts`).*
- **Plain and motion:** 44 sections ship plain (server-rendered, no animation runtime); 35 also have a
  motion version. *Done.*
- **Distribution:** sections install with the shadcn CLI from the static registry at
  `https://tapasui.tahmid.space/r/<name>.json`, or as `@tapas/<name>` through the shadcn MCP server.
  *GitHub-registry install (`shadcn add owner/repo/...`) was not adopted: unverified, and the static
  registry already needs no server.*
- **Working stubs, no Tapas backend:** waitlist forms post to the user's own endpoint (the demo uses a
  route that adds to a Resend audience) and pricing links to hosted checkout (Stripe Payment Links).
  *Done in the demo, including per-period (`yearlyHref`) checkout links and a honeypot field.*

## Marketing and sales

- **Hero hook:** a 3-mode preview (plain, 2D spring motion, 3D WebGL shader). *Plain and motion exist;
  the WebGL mode is deferred so the landing page stays near its 150 kB first-load budget.*
- **Live-site fixes:** one `h1` per page, real domain, current badge, rich section previews, and Copy code /
  Copy AI prompt / MCP install on every section. *Done (#25, #26).*
- **Pro:** $49–99 one-time multi-page SaaS kits with SEO/OG images, a blog and legal pages.
  *Needs a one-time Stripe price and a private repo for the paid source.*

## Roadmap

| Phase | Weeks | Scope | Status |
| --- | --- | --- | --- |
| 1 | 1–2 | Live-site bugs, copy buttons on all 44 sections, registry endpoints checked | Done (#25, #26) |
| 2 | 3–4 | Flagship demo site driven by `content.ts` | Done: Ledgerline (#27, #28) |
| 3 | 5–8 | First Pro SaaS website kit and one-time hosted checkout | Blocked on owner inputs |
