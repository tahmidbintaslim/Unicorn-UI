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
import { HeroMark } from "./_landing/hero-mark";
import { LaunchDemo } from "./_landing/launch-demo";
import { MenuRibbon } from "./_landing/menu-ribbon";
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

// A Stripe test-mode payment link (also used by the demo sites): no real charge is possible.
const TEST_CHECKOUT = "https://buy.stripe.com/test_28EbJ0ckZ5xd3rgg6l1ck02";

/** What a launch page has to do, and the sections that do it. */
const JOBS = [
  { title: "Collect sign-ups", color: "text-saffron", body: "Forms that post to your API, work without JavaScript and carry a spam trap.", slugs: ["hero-waitlist", "newsletter", "coming-soon"] },
  { title: "Price it and get paid", color: "text-paprika", body: "Plans with a monthly and yearly switch, and buttons that take any checkout link.", slugs: ["pricing-table", "comparison-table", "pricing-card"] },
  { title: "Explain the product", color: "text-olive", body: "Heroes and feature layouts that show your product, not ours.", slugs: ["hero-split", "feature-rows", "bento-grid"] },
  { title: "Answer questions, earn trust", color: "text-saffron", body: "FAQ, quotes and numbers, readable by screen readers and search engines.", slugs: ["faq", "testimonials-wall", "stats-band"] },
];

/** Launch-day work each section already does. Facts about the code, not usage numbers. */
const DONE = [
  { text: "Stores emails", href: "/docs/sections/hero-waitlist" },
  { text: "Takes payments", href: "/docs/sections/pricing-table" },
  { text: "Blocks spam", href: "/docs/sections/newsletter" },
  { text: "Accessible", href: "/docs" },
  { text: "Uses your theme", href: "/docs/theming" },
];

const DEMOS = [
  { name: "Ledgerline", href: "/examples/ledgerline", body: "Invoicing for freelancers. Three pages, plain sections, no animation library." },
  { name: "Patchnote", href: "/examples/patchnote", body: "AI release notes. One page built from the motion sections." },
  { name: "Stackwise", href: "/examples/stackwise", body: "An AI dependency agent. WebGL hero, pricing page and comparison table." },
];

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
          description: "Free, open-source launch page sections for Next.js and shadcn/ui: waitlist, pricing and checkout, wired up.",
          url: "https://tapasui.tahmid.space",
          codeRepository: GITHUB_URL,
          programmingLanguage: ["TypeScript", "React"],
          license: "https://opensource.org/licenses/MIT",
        }}
      />
      <SiteHeader />
      <main>
        <HeroCanvas>
          <section aria-labelledby="hero-title" className="px-4 pt-16 pb-14 text-center sm:pt-20">
            <HeroMark />
            <h1
              id="hero-title"
              className="mx-auto mt-8 max-w-4xl text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance"
            >
              Launch pages that actually <span className="text-brand">work</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-[19px]">
              Waitlist, pricing and checkout sections for Next.js and shadcn/ui. Free, wired up and ready to ship.
            </p>
            <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 px-6 text-[15px]">
                <Link href="/docs/installation">Get started (free)</Link>
              </Button>
              <CopyCommand command={installCommand("hero-waitlist")} className="h-11 w-full sm:w-auto sm:max-w-md" />
            </div>
            <LaunchDemo checkoutHref={TEST_CHECKOUT} />
          </section>
        </HeroCanvas>

        {/* Done for you */}
        <section aria-labelledby="done-title" className="border-t px-4 py-10">
          <h2 id="done-title" className="text-center text-[13px] font-medium text-muted-foreground">
            Already done in every section
          </h2>
          <ul className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-lg font-semibold sm:text-xl">
            {DONE.map((d, i) => (
              <li key={d.text}>
                <Link href={d.href} className="flex min-h-11 items-center gap-2.5 hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">
                  <span aria-hidden="true" className={`size-2.5 rounded-full ${["bg-saffron", "bg-paprika", "bg-olive"][i % 3]}`} />
                  {d.text}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <MenuRibbon items={SECTIONS.map(({ slug, title }) => ({ slug, title }))} />

        {/* Sections by launch job */}
        <section aria-labelledby="jobs-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <h2 id="jobs-title" className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
                Everything a launch page has to do.
              </h2>
              <Button asChild variant="outline" className="w-fit">
                <Link href="/docs/sections">
                  View all {SECTIONS.length} sections
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            {JOBS.map((job) => (
              <div key={job.title} className="mt-16">
                <h3 className={`text-2xl font-semibold tracking-tight ${job.color}`}>{job.title}</h3>
                <p className="mt-2 max-w-xl text-muted-foreground">{job.body}</p>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {job.slugs.map((slug) => {
                    const section = getSection(slug);
                    return section ? (
                      <li key={slug}>
                        <SectionCard section={section} headingLevel="h4" />
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Demo sites as proof */}
        <section aria-labelledby="demos-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            <h2 id="demos-title" className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
              Three working sites, built only from these sections.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              The companies are made up. The waitlists and test checkouts are real.
            </p>
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {DEMOS.map((d) => (
                <li key={d.name}>
                  <Link
                    href={d.href}
                    className="group flex h-full flex-col gap-3 rounded-2xl border bg-card p-6 transition-[border-color,translate] duration-300 hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-brand motion-safe:hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-semibold tracking-tight">{d.name}</h3>
                    <p className="text-muted-foreground">{d.body}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-brand">
                      Open the site
                      <ArrowRight aria-hidden="true" className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Playground */}
        <section aria-labelledby="playground-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <h2 id="playground-title" className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
              Try it before you <span className="text-olive">install</span> it.
            </h2>
            <div className="mt-10">
              <Playground sources={playgroundSources()} />
            </div>
          </Reveal>
        </section>

        {/* Page builder */}
        <section aria-labelledby="builder-title" className="border-t">
          <Reveal className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
            <h2 id="builder-title" className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
              Stack sections into a page, in your colors.
            </h2>
            <div className="mt-10">
              <PageBuilder />
            </div>
          </Reveal>
        </section>

        {/* Templates */}
        <section aria-labelledby="templates-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <h2 id="templates-title" className="text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
                  Or start from a <span className="text-saffron">whole page</span>.
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

        {/* Pricing */}
        <section aria-labelledby="pricing-title" className="border-t">
          <Reveal className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <h2 id="pricing-title" className="mx-auto max-w-2xl text-center text-4xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
              Free to use. <span className="text-saffron">Pro</span> when you want whole pages.
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
            className="absolute inset-0 -z-10 bg-[radial-gradient(40%_70%_at_20%_0%,color-mix(in_oklch,var(--olive)_14%,transparent),transparent),radial-gradient(45%_80%_at_50%_0%,color-mix(in_oklch,var(--saffron)_18%,transparent),transparent),radial-gradient(40%_70%_at_80%_0%,color-mix(in_oklch,var(--paprika)_16%,transparent),transparent)]"
          />
          <h2 id="oss-title" className="mx-auto max-w-3xl text-4xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-[52px]">
            Open source. Add the next <span className="text-paprika">section</span>.
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
