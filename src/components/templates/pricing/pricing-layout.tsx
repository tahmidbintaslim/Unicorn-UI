import type { ComparisonTable } from "@/components/custom/comparison-table/comparison-table";
import type { CtaBanner } from "@/components/custom/cta-banner/cta-banner";
import type { Faq } from "@/components/custom/faq/faq";
import type { Footer } from "@/components/custom/footer/footer";
import type { Hero } from "@/components/custom/hero/hero";
import type { Navbar } from "@/components/custom/navbar/navbar";
import type { PricingTable } from "@/components/custom/pricing-table/pricing-table";
import type { PricingContent } from "./content";

/** The sections a pricing page is built from; plain and motion entry points pass their own versions. */
export interface PricingUi {
  Navbar: typeof Navbar;
  Hero: typeof Hero;
  PricingTable: typeof PricingTable;
  ComparisonTable: typeof ComparisonTable;
  Faq: typeof Faq;
  CtaBanner: typeof CtaBanner;
  Footer: typeof Footer;
}

/** A complete pricing page. */
export function PricingLayout({ c, ui }: { c: PricingContent; ui: PricingUi }) {
  const { Navbar, Hero, PricingTable, ComparisonTable, Faq, CtaBanner, Footer } = ui;
  return (
    <>
      <Navbar brand={c.brand.name} brandHref={c.brand.href} links={c.nav.links} action={c.nav.action} />
      <main>
        <Hero {...c.hero} className="pb-0" />
        <PricingTable id="plans" {...c.pricing} />
        <ComparisonTable id="compare" {...c.comparison} />
        <Faq id="faq" {...c.faq} />
        <CtaBanner {...c.cta} />
      </main>
      <Footer brand={c.brand.name} {...c.footer} />
    </>
  );
}
