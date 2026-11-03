import type { CtaBanner } from "@/components/custom/cta-banner/cta-banner";
import type { Faq } from "@/components/custom/faq/faq";
import type { FeatureGrid } from "@/components/custom/feature-grid/feature-grid";
import type { Footer } from "@/components/custom/footer/footer";
import type { HeroSplit } from "@/components/custom/hero-split/hero-split";
import type { LogoCloud } from "@/components/custom/logo-cloud/logo-cloud";
import type { Navbar } from "@/components/custom/navbar/navbar";
import type { PricingTable } from "@/components/custom/pricing-table/pricing-table";
import type { StatsBand } from "@/components/custom/stats-band/stats-band";
import type { TestimonialsWall } from "@/components/custom/testimonials-wall/testimonials-wall";
import { ProductShot } from "../product-shot";
import type { SaasContent } from "./content";

/** The sections a SaaS page is built from; plain and motion entry points pass their own versions. */
export interface SaasUi {
  Navbar: typeof Navbar;
  Hero: typeof HeroSplit;
  LogoCloud: typeof LogoCloud;
  FeatureGrid: typeof FeatureGrid;
  StatsBand: typeof StatsBand;
  TestimonialsWall: typeof TestimonialsWall;
  PricingTable: typeof PricingTable;
  Faq: typeof Faq;
  CtaBanner: typeof CtaBanner;
  Footer: typeof Footer;
}

/** A complete SaaS landing page. */
export function SaasLayout({ c, ui }: { c: SaasContent; ui: SaasUi }) {
  const { Navbar, Hero, LogoCloud, FeatureGrid, StatsBand, TestimonialsWall, PricingTable, Faq, CtaBanner, Footer } = ui;
  return (
    <>
      <Navbar brand={c.brand.name} brandHref={c.brand.href} links={c.nav.links} action={c.nav.action} />
      <main>
        <Hero {...c.hero} media={<ProductShot />} />
        <LogoCloud title={c.logos.title} logos={c.logos.names.map((name) => ({ name }))} />
        <FeatureGrid id="features" {...c.features} />
        <StatsBand {...c.stats} />
        <TestimonialsWall {...c.testimonials} />
        <PricingTable id="pricing" {...c.pricing} />
        <Faq id="faq" {...c.faq} />
        <CtaBanner {...c.cta} />
      </main>
      <Footer brand={c.brand.name} {...c.footer} />
    </>
  );
}
