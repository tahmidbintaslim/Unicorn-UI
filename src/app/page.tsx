import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { CopyCommand } from "./_site/copy-command";
import { GITHUB_URL, GOOD_FIRST_ISSUES_URL, installCommand } from "./_site/links";
import { SECTIONS, getSection } from "./_site/sections";
import { SiteFooter } from "./_site/site-footer";
import { SiteHeader } from "./_site/site-header";
import { SectionCard } from "./_site/section-card";
import { HeroCanvas } from "./_landing/hero-canvas";
import { PageBuilder } from "./_landing/page-builder";
import { Playground } from "./_landing/playground";
import { Pricing } from "./_landing/pricing";
import { PLAYGROUND } from "./_landing/playground-data";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { JsonLd } from "./_site/json-ld";
import { Reveal } from "./_site/reveal";
import { TemplateCard } from "./_site/template-card";
import { TEMPLATES } from "./_site/templates";

export const metadata = { alternates: { canonical: "/" } };

/** Sections shown in the catalogue grid, in reading order. */
const MENU = [
  "hero-split",
  "hero-theme-cycle",
  "hero-plates",
  "hero-command",
  "hero-spotlight",
  "hero",
  "navbar",
  "bento-grid",
  "pricing-card",
  "faq",
  "cta-banner",
  "footer",
];

/** The four promises, set large instead of as icon cards. */
const PROMISES = ["Your theme.", "Your code.", "Server-first.", "Accessible."];

/** Real component source for the playground's code tab, read at build time. */
function playgroundSources() {
  const read = (slug: string, file: string) =>
    readFileSync(join(process.cwd(), "src", "components", "custom", slug, `${file}.tsx`), "utf8");
  return Object.fromEntries(PLAYGROUND.map((p) => [p.slug, { plain: read(p.slug, p.slug), motion: read(p.slug, `${p.slug}-motion`) }]));
}

export default function Home() {
  return (
    // The landing page is always dark, whatever the visitor's theme; the docs follow their choice.
    <div className="dark min-h-screen bg-background text-foreground [color-scheme:dark]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: "Tapas UI",
          description: "Free, open-source landing page sections for Next.js and shadcn/ui.",
          url: "https://tapasui.tahmid.space",
          codeRepository: GITHUB_URL,
          programmingLanguage: ["TypeScript", "React"],
          license: "https://opensource.org/licenses/MIT",
        }}
      />
      <SiteHeader />
      <main>
        <HeroCanvas>
          <section aria-labelledby="hero-title" className="px-4 pt-24 pb-14 text-center sm:pt-28">
            <h1
              id="hero-title"
              className="mx-auto max-w-4xl text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance"
            >
              Landing page sections you copy, <span className="text-brand">own</span> and ship.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-[19px]">
              Free shadcn/ui sections for Next.js. One command each, in your colors.
            </p>
            <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 px-6 text-[15px]">
                <Link href="/docs/installation">Get started (free)</Link>
              </Button>
              <CopyCommand command={installCommand("hero")} className="h-11 w-full sm:w-auto sm:max-w-md" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <Link href="/examples/ledgerline" className="font-medium text-foreground underline underline-offset-4 hover:text-brand">
                See a live demo site
              </Link>{" "}
              with a working waitlist.
            </p>
          </section>
          <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6 lg:px-8">
            <PageBuilder />
          </div>
        </HeroCanvas>

        {/* Playground */}
        <section aria-labelledby="playground-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <h2 id="playground-title" className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
              Try it before you install it.
            </h2>
            <div className="mt-10">
              <Playground sources={playgroundSources()} />
            </div>
          </Reveal>
        </section>

        {/* Catalogue */}
        <section aria-labelledby="menu-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <h2 id="menu-title" className="text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
                  Every section a landing page needs.
                </h2>
              <Button asChild variant="outline" className="w-fit">
                <Link href="/docs/sections">
                  View all {SECTIONS.length} sections
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
                    <SectionCard section={section} />
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </section>

        {/* Templates */}
        <section aria-labelledby="templates-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <h2 id="templates-title" className="text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
                  Or start from a whole page.
                </h2>
              <Button asChild variant="outline" className="w-fit">
                <Link href="/templates">
                  All templates
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {TEMPLATES.map((t) => (
                <li key={t.slug}>
                  <TemplateCard template={t} headingLevel="h3" compact />
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Why: one bold statement instead of four icon cards */}
        <section aria-labelledby="why-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            <h2 id="why-title" className="text-[13px] font-medium text-muted-foreground">
              Built like shadcn/ui, made for marketing pages
            </h2>
            <ul className="mt-8 text-[clamp(2.75rem,8vw,6rem)] leading-[1] font-semibold tracking-[-0.04em]">
              {PROMISES.map((p, i) => (
                <li key={p} className={i % 2 ? "text-muted-foreground" : undefined}>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Pricing */}
        <section aria-labelledby="pricing-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <h2 id="pricing-title" className="mx-auto max-w-2xl text-center text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
              Free to use. Pro when you want whole pages.
            </h2>
            <div className="mt-12">
              <Pricing />
            </div>
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
            MIT licensed. Pick a good first issue and add the next section.
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
