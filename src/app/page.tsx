import { Button } from "@/components/ui/button";
import { ArrowRight, Github, LayoutGrid, Palette, PersonStanding, Server, Terminal, SquarePen } from "lucide-react";
import Link from "next/link";
import { CopyCommand } from "./_site/copy-command";
import { GITHUB_URL, GOOD_FIRST_ISSUES_URL, installCommand } from "./_site/links";
import { getSection } from "./_site/sections";
import { SiteFooter } from "./_site/site-footer";
import { SiteHeader } from "./_site/site-header";
import { SectionSketch } from "./_landing/section-sketch";
import { ThemeShowcase } from "./_landing/theme-showcase";
import { Reveal } from "./_site/reveal";

/** Sections shown in the catalogue grid, in reading order. */
const MENU = [
  "hero",
  "navbar",
  "bento-grid",
  "pricing-card",
  "faq",
  "cta-banner",
  "logo-cloud",
  "testimonial-card",
  "footer",
];

const STEPS = [
  {
    icon: LayoutGrid,
    title: "Pick a section",
    body: "Browse hero, pricing, FAQ, footer and more. Preview each one in light and dark, in your colors.",
    code: "tapas-ui.vercel.app/docs/sections",
  },
  {
    icon: Terminal,
    title: "Run one command",
    body: "The shadcn CLI copies the component and its dependencies into your project. No package to keep updated.",
    code: "npx shadcn@latest add …/r/faq.json",
  },
  {
    icon: SquarePen,
    title: "Make it yours",
    body: "It is your code now. Change the copy, move things around, ship. Sections render as server components.",
    code: "<Faq items={faqs} />",
  },
];

const REASONS = [
  {
    icon: Palette,
    title: "Your theme, not ours",
    body: "Sections use shadcn tokens such as primary and muted, so they match the rest of your app with no extra setup.",
  },
  {
    icon: SquarePen,
    title: "You own the code",
    body: "Nothing to import from node_modules. The component lands in your repo, readable and editable.",
  },
  {
    icon: Server,
    title: "Server-first",
    body: "Sections render as React Server Components. Only interactive parts, like a copy button, ship JavaScript.",
  },
  {
    icon: PersonStanding,
    title: "Accessible by default",
    body: "Semantic HTML, keyboard support and screen-reader labels, with contrast checked in light and dark.",
  },
];

export default function Home() {
  return (
    // The landing page is always dark, whatever the visitor's theme; the docs follow their choice.
    <div className="dark min-h-screen bg-background text-foreground [color-scheme:dark]">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          aria-labelledby="hero-title"
          className="relative isolate overflow-hidden px-4 pt-24 pb-14 text-center sm:pt-28"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 mx-auto h-[36rem] max-w-5xl rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand)_22%,transparent),transparent)]"
          />
          <Link
            href="/docs/sections/navbar"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
            New: Navbar and Bento grid sections
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
          <h1
            id="hero-title"
            className="mx-auto mt-7 max-w-4xl text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance"
          >
            Landing page sections you copy, <span className="text-brand">own</span> and ship.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-[19px]">
            Free, open-source hero, pricing, FAQ, footer and more for Next.js and shadcn/ui. One command
            installs the code into your project, and it picks up your theme.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-11 px-6 text-[15px]">
              <Link href="/docs/sections">Browse sections</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-6 text-[15px]">
              <a href={GITHUB_URL}>
                <Github aria-hidden="true" />
                Star on GitHub
              </a>
            </Button>
          </div>
          <CopyCommand command={installCommand("hero")} className="mx-auto mt-7 w-fit" />
        </section>

        <ThemeShowcase />

        {/* Built for */}
        <section aria-labelledby="stack-title" className="px-4 pt-24 pb-24 text-center">
          <h2 id="stack-title" className="text-[13px] font-medium text-muted-foreground">
            Built for the stack you already use
          </h2>
          <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-14 gap-y-4 text-lg font-semibold text-muted-foreground/90 sm:text-xl">
            {["Next.js", "shadcn/ui", "Tailwind CSS", "React 19", "TypeScript"].map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <h2 id="how-title" className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
              From blank page to launch in three steps.
            </h2>
            <ol className="mt-12 grid gap-5 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-4 rounded-2xl border bg-card p-7">
                  <span className="flex items-center gap-3 text-brand">
                    <step.icon aria-hidden="true" className="size-5" />
                    <span className="font-mono text-sm">Step {i + 1}</span>
                  </span>
                  <h3 className="text-[22px] font-semibold tracking-tight">{step.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{step.body}</p>
                  <code className="mt-auto truncate rounded-lg border bg-background px-3 py-2.5 font-mono text-xs">
                    {step.code}
                  </code>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* Catalogue */}
        <section aria-labelledby="menu-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="space-y-4">
                <h2 id="menu-title" className="text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
                  Every section a landing page needs.
                </h2>
                <p className="text-[17px] text-muted-foreground">
                  Each one is a single install. Preview it, copy the command, done.
                </p>
              </div>
              <Button asChild variant="outline" className="w-fit">
                <Link href="/docs/sections">
                  View all sections
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MENU.map((slug) => {
                const section = getSection(slug);
                if (!section) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/docs/sections/${slug}`}
                      className="group block overflow-hidden rounded-2xl border bg-card transition-colors hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      <div className="bg-background transition-colors group-hover:bg-background/60">
                        <SectionSketch slug={slug} />
                      </div>
                      <div className="space-y-1 border-t px-5 py-4">
                        <h3 className="font-semibold">{section.title}</h3>
                        <p className="truncate font-mono text-xs text-muted-foreground">add …/r/{slug}.json</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </section>

        {/* Why */}
        <section aria-labelledby="why-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            <h2 id="why-title" className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
              Built like shadcn/ui. Made for marketing pages.
            </h2>
            <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {REASONS.map((reason) => (
                <li key={reason.title} className="space-y-3 border-t pt-6">
                  <reason.icon aria-hidden="true" className="size-5 text-brand" />
                  <h3 className="text-lg font-semibold">{reason.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{reason.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Open source */}
        <section
          aria-labelledby="oss-title"
          className="relative isolate overflow-hidden border-t px-4 py-28 text-center"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,color-mix(in_oklch,var(--brand)_16%,transparent),transparent)]"
          />
          <h2 id="oss-title" className="mx-auto max-w-3xl text-4xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-[52px]">
            Pull up a chair. Bring a section.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-pretty text-muted-foreground">
            Tapas UI is MIT licensed and built in the open. Star the repo to follow along, or pick a good first
            issue and add the next section.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-11 px-6 text-[15px]">
              <a href={GITHUB_URL}>
                <Github aria-hidden="true" />
                Star on GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-6 text-[15px]">
              <a href={GOOD_FIRST_ISSUES_URL}>See good first issues</a>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
