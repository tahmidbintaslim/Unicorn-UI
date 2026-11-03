"use client";

import { CtaBanner } from "@/components/custom/cta-banner";
import { Faq } from "@/components/custom/faq";
import { FeatureGrid } from "@/components/custom/feature-grid";
import { Footer } from "@/components/custom/footer";
import { Hero } from "@/components/custom/hero";
import { HeroSplit } from "@/components/custom/hero-split";
import { LogoCloud } from "@/components/custom/logo-cloud";
import { Navbar } from "@/components/custom/navbar";
import { PricingCard } from "@/components/custom/pricing-card";
import { StatsBand } from "@/components/custom/stats-band";
import { TestimonialsWall } from "@/components/custom/testimonials-wall";
import { cn } from "@/lib/utils";
import { Gauge, LineChart, Lock } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React from "react";
import { ThemeSwatches } from "../_site/theme-swatches";

const EASE = [0.16, 1, 0.3, 1] as const;

type SectionId = "navbar" | "hero" | "logos" | "features" | "stats" | "testimonials" | "pricing" | "faq" | "cta" | "footer";

const CHIPS: { id: SectionId; label: string }[] = [
  { id: "navbar", label: "Navbar" },
  { id: "hero", label: "Hero" },
  { id: "logos", label: "Logo cloud" },
  { id: "features", label: "Features" },
  { id: "stats", label: "Stats" },
  { id: "testimonials", label: "Testimonials" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "CTA" },
  { id: "footer", label: "Footer" },
];

/** Sample chart for the split hero; labelled as sample data. */
function SampleChart() {
  return (
    <div role="img" aria-label="Sample chart" className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex h-28 items-end gap-1.5">
        {[40, 55, 48, 72, 66, 90, 84, 100].map((h, i) => (
          <span key={i} className="flex-1 rounded-t bg-primary" style={{ height: `${h}%`, opacity: 0.35 + i * 0.08 }} />
        ))}
      </div>
    </div>
  );
}

const hero = {
  eyebrow: "New: usage by feature",
  title: "Know which features your users love",
  description: "Product analytics without the setup. Drop in one script and see usage by feature.",
  primaryAction: { label: "Start free", href: "#start" },
  secondaryAction: { label: "Book a demo", href: "#demo" },
};

/** Renders one Tapas section of the made-up Acme Analytics site. */
function Section({ id, heroLayout }: { id: SectionId; heroLayout: "centered" | "split" }) {
  switch (id) {
    case "navbar":
      return (
        <Navbar
          brand="Acme Analytics"
          links={[
            { label: "Product", href: "#product" },
            { label: "Pricing", href: "#pricing" },
            { label: "Docs", href: "#docs" },
          ]}
          action={{ label: "Start free", href: "#start" }}
        />
      );
    case "hero":
      return heroLayout === "split" ? (
        <HeroSplit {...hero} media={<SampleChart />} className="py-12" />
      ) : (
        <Hero {...hero} className="py-12" />
      );
    case "logos":
      return <LogoCloud title="Sample logos: made-up teams" logos={["Northwind", "Globex", "Initech", "Umbrella", "Hooli"].map((name) => ({ name }))} className="py-8" />;
    case "features":
      return (
        <FeatureGrid
          title="Everything in one place"
          items={[
            { title: "Feature reports", description: "See which features people use.", icon: LineChart },
            { title: "Fast queries", description: "Answers in under a second on sample data.", icon: Gauge },
            { title: "Private by default", description: "No cookies, no personal data.", icon: Lock },
          ]}
          className="py-10"
        />
      );
    case "stats":
      return (
        <StatsBand
          title="Acme by the numbers"
          description="Made-up figures for a made-up company."
          stats={[
            { value: 2400, label: "Sample teams", suffix: "+" },
            { value: 38, label: "Sample countries" },
            { value: 99.9, label: "Sample uptime", suffix: "%", decimals: 1 },
          ]}
          className="py-10"
        />
      );
    case "testimonials":
      return (
        <TestimonialsWall
          title="What teams say"
          description="Sample quotes from made-up people."
          items={[
            { quote: "We found our stickiest feature in a day.", author: "Maya R.", role: "Founder (sample)" },
            { quote: "Setup took one script tag.", author: "Leo K.", role: "Engineer (sample)" },
            { quote: "Finally, reports the whole team reads.", author: "Priya S.", role: "PM (sample)" },
          ]}
          className="py-10"
        />
      );
    case "pricing":
      return (
        <div className="mx-auto grid max-w-4xl gap-6 px-4 py-10 sm:px-8 md:grid-cols-3">
          <PricingCard name="Hobby" price={0} features={[{ text: "1 project", included: true }, { text: "Feature reports", included: false }]} ctaText="Start free" />
          <PricingCard name="Pro" price={19} popular features={[{ text: "10 projects", included: true }, { text: "Feature reports", included: true }]} ctaText="Start trial" />
          <PricingCard name="Team" price={49} features={[{ text: "Unlimited projects", included: true }, { text: "Feature reports", included: true }]} ctaText="Contact sales" />
        </div>
      );
    case "faq":
      return (
        <Faq
          items={[
            { question: "Is there a free plan?", answer: "Yes. Hobby is free for one project." },
            { question: "Can I cancel anytime?", answer: "Yes, from your billing page." },
          ]}
        />
      );
    case "cta":
      return <CtaBanner title="Start measuring today" description="Free for your first project." actionLabel="Start free" actionHref="#start" />;
    case "footer":
      return (
        <Footer
          brand="Acme Analytics"
          note="© Acme Analytics. Made-up company."
          columns={[
            { title: "Product", links: [{ label: "Pricing", href: "#pricing" }, { label: "Docs", href: "#docs" }] },
            { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Blog", href: "#blog" }] },
          ]}
        />
      );
  }
}

/**
 * The landing page's live demo: toggle sections on and off and watch a page
 * built only from Tapas sections re-lay itself out, in the color you pick.
 */
export function PageBuilder() {
  const reduced = useReducedMotion();
  const [on, setOn] = React.useState<Set<SectionId>>(() => new Set(["navbar", "hero", "pricing"]));
  const [heroLayout, setHeroLayout] = React.useState<"centered" | "split">("centered");
  const toggle = (id: SectionId) =>
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const active = CHIPS.filter((c) => on.has(c.id));
  const move = reduced ? { duration: 0 } : { duration: 0.5, ease: EASE };

  return (
    <div className="theme-showcase">
      <div className="flex flex-col items-center gap-3">
        <div role="group" aria-label="Sections on the example page" className="flex flex-wrap justify-center gap-2">
          {CHIPS.map((chip) => {
            const pressed = on.has(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => toggle(chip.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  pressed
                    ? "border-brand/60 bg-brand/15 text-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
          <fieldset className="flex items-center gap-2">
            <legend className="sr-only">Theme color for the example page</legend>
            <span aria-hidden="true">Theme</span>
            <ThemeSwatches name="builder-theme" />
          </fieldset>
          <div className="flex items-center gap-2">
            <label htmlFor="builder-hero-layout">Hero layout</label>
            <select
              id="builder-hero-layout"
              value={heroLayout}
              onChange={(e) => setHeroLayout(e.target.value as "centered" | "split")}
              className="rounded-md border bg-card px-2 py-1 text-foreground focus-visible:outline-2 focus-visible:outline-brand"
            >
              <option value="centered">Centered</option>
              <option value="split">Split</option>
            </select>
          </div>
        </div>
      </div>

      <figure className="mt-5">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-[0_30px_120px_-30px_color-mix(in_oklch,var(--brand)_35%,transparent)]">
          <div aria-hidden="true" className="flex items-center gap-2 border-b px-4 py-3">
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="ml-2 rounded-md bg-background px-3 py-1 font-mono text-xs text-muted-foreground">acme-analytics.example</span>
          </div>
          {/* inert: the demo's links go nowhere, so keep them out of tab order and the a11y tree. */}
          <div inert className="theme-demo light min-h-64 bg-background text-foreground">
            <AnimatePresence initial={false} mode="popLayout">
              {active.length === 0 ? (
                <motion.p
                  key="empty"
                  className="grid min-h-64 place-items-center text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={move}
                >
                  Add a section to start your page.
                </motion.p>
              ) : (
                active.map((chip) => (
                  <motion.div
                    key={chip.id}
                    layout={!reduced}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={move}
                    className={cn(chip.id === "logos" && "bg-muted/50")}
                  >
                    <Section id={chip.id} heroLayout={heroLayout} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
        <figcaption className="mt-4 text-center text-xs text-muted-foreground">
          Every part of this example is a Tapas section. Acme Analytics and its prices are made up.
        </figcaption>
      </figure>
    </div>
  );
}
