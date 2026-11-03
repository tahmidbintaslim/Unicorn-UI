import { Hero } from "@/components/custom/hero";
import { LogoCloud } from "@/components/custom/logo-cloud";
import { Navbar } from "@/components/custom/navbar";
import { PricingCard } from "@/components/custom/pricing-card";
import { ThemeSwatches } from "../_site/theme-swatches";


/** Labels which Tapas section each part of the demo site is. */
function SectionTag({ name }: { name: string }) {
  return (
    <span className="pointer-events-none absolute top-3 left-3 z-10 hidden rounded-md bg-brand px-2 py-0.5 font-mono text-[11px] font-medium text-brand-foreground shadow-sm sm:block">
      {name}
    </span>
  );
}

/**
 * A made-up company site built only from Tapas sections, plus a color picker
 * that re-themes it. The picker is plain radio inputs; globals.css maps the
 * checked one to shadcn theme tokens, so this stays a server component.
 */
export function ThemeShowcase() {
  return (
    <section aria-labelledby="showcase-title" className="theme-showcase mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 id="showcase-title" className="sr-only">
        Example site built from Tapas sections
      </h2>
      <fieldset className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border bg-card px-3 py-2 text-center sm:rounded-full sm:py-1.5 sm:pr-4 sm:pl-2">
        <legend className="sr-only">Theme color for the example site</legend>
        <ThemeSwatches name="showcase-theme" />
        <p className="text-[13px] font-medium text-muted-foreground">
          Your theme, not ours. Pick a color and every section follows.
        </p>
      </fieldset>

      <figure className="mt-5">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-[0_30px_120px_-30px_color-mix(in_oklch,var(--brand)_35%,transparent)]">
          <div aria-hidden="true" className="flex items-center gap-2 border-b px-4 py-3">
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="ml-2 rounded-md bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
              acme-analytics.example
            </span>
          </div>
          {/* inert: the demo's links go nowhere, so keep them out of tab order and the a11y tree. */}
          <div inert className="theme-demo light bg-background text-foreground">
            <div className="relative">
              <SectionTag name="navbar" />
              <Navbar
                brand="Acme Analytics"
                links={[
                  { label: "Product", href: "#product" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Docs", href: "#docs" },
                ]}
                action={{ label: "Start free", href: "#" }}
                className="sm:[&>nav]:pl-24"
              />
            </div>
            <div className="relative">
              <SectionTag name="hero" />
              <Hero
                eyebrow="New: usage by feature"
                title="Know which features your users love."
                description="Product analytics without the setup. Drop in one script and see usage by feature."
                primaryAction={{ label: "Start free", href: "#" }}
                secondaryAction={{ label: "Book a demo", href: "#" }}
                className="py-14"
              />
            </div>
            <div className="relative bg-muted/50">
              <SectionTag name="logo-cloud" />
              <LogoCloud
                logos={["Northwind", "Globex", "Initech", "Umbrella", "Hooli"].map((name) => ({ name }))}
                className="py-10"
              />
            </div>
            <div className="relative px-4 pt-14 pb-12 sm:px-10">
              <SectionTag name="pricing-card" />
              <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
                <PricingCard
                  name="Hobby"
                  price={0}
                  features={[
                    { text: "1 project", included: true },
                    { text: "Feature reports", included: false },
                  ]}
                  ctaText="Start free"
                />
                <PricingCard
                  name="Pro"
                  price={19}
                  popular
                  features={[
                    { text: "10 projects", included: true },
                    { text: "Feature reports", included: true },
                  ]}
                  ctaText="Start trial"
                />
                <PricingCard
                  name="Team"
                  price={49}
                  features={[
                    { text: "Unlimited projects", included: true },
                    { text: "Feature reports", included: true },
                  ]}
                  ctaText="Contact sales"
                />
              </div>
            </div>
          </div>
        </div>
        <figcaption className="mt-4 text-center text-xs text-muted-foreground">
          Every part of this example comes from a Tapas section. Acme Analytics and its prices are made up.
        </figcaption>
      </figure>
    </section>
  );
}
