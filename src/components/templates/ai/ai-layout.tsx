import type { AnnouncementBar } from "@/components/custom/announcement-bar/announcement-bar";
import type { ComparisonTable } from "@/components/custom/comparison-table/comparison-table";
import type { CtaSplit } from "@/components/custom/cta-split/cta-split";
import type { FeatureGrid } from "@/components/custom/feature-grid/feature-grid";
import type { Footer } from "@/components/custom/footer/footer";
import type { HeroSpotlight } from "@/components/custom/hero-spotlight/hero-spotlight";
import type { IntegrationsGrid } from "@/components/custom/integrations-grid/integrations-grid";
import type { Navbar } from "@/components/custom/navbar/navbar";
import type { PricingTable } from "@/components/custom/pricing-table/pricing-table";
import type { Steps } from "@/components/custom/steps/steps";
import { ProductShot } from "../product-shot";
import type { AiContent } from "./content";

export interface AiUi {
  AnnouncementBar: typeof AnnouncementBar;
  Navbar: typeof Navbar;
  Hero: typeof HeroSpotlight;
  FeatureGrid: typeof FeatureGrid;
  Steps: typeof Steps;
  IntegrationsGrid: typeof IntegrationsGrid;
  ComparisonTable: typeof ComparisonTable;
  PricingTable: typeof PricingTable;
  CtaSplit: typeof CtaSplit;
  Footer: typeof Footer;
}

/** A complete AI product landing page. */
export function AiLayout({ c, ui }: { c: AiContent; ui: AiUi }) {
  const { AnnouncementBar, Navbar, Hero, FeatureGrid, Steps, IntegrationsGrid, ComparisonTable, PricingTable, CtaSplit, Footer } = ui;
  return (
    <>
      <AnnouncementBar {...c.announcement} dismissible />
      <Navbar brand={c.brand.name} brandHref={c.brand.href} links={c.nav.links} action={c.nav.action} />
      <main>
        <Hero {...c.hero} />
        <FeatureGrid {...c.features} />
        <Steps id="how" {...c.steps} />
        <IntegrationsGrid id="integrations" {...c.integrations} />
        <ComparisonTable {...c.comparison} />
        <PricingTable id="pricing" {...c.pricing} />
        <CtaSplit {...c.cta} media={<ProductShot label="Sample support inbox" />} />
      </main>
      <Footer brand={c.brand.name} {...c.footer} />
    </>
  );
}
