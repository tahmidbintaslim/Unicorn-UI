import { CtaBanner } from "@/components/custom/cta-banner/cta-banner";
import { Faq } from "@/components/custom/faq/faq";
import { FeatureGrid } from "@/components/custom/feature-grid/feature-grid";
import { Footer } from "@/components/custom/footer/footer";
import { HeroSplit } from "@/components/custom/hero-split/hero-split";
import { LogoCloud } from "@/components/custom/logo-cloud/logo-cloud";
import { Navbar } from "@/components/custom/navbar/navbar";
import { PricingTable } from "@/components/custom/pricing-table/pricing-table";
import { StatsBand } from "@/components/custom/stats-band/stats-band";
import { TestimonialsWall } from "@/components/custom/testimonials-wall/testimonials-wall";
import { mergeContent, type ContentOverrides } from "../merge";
import { saasContent, type SaasContent } from "./content";
import { SaasLayout } from "./saas-layout";

/** Free SaaS landing page template, built only from plain Tapas sections. */
export function SaasTemplate({ content }: { content?: ContentOverrides<SaasContent> }) {
  return (
    <SaasLayout
      c={mergeContent(saasContent, content)}
      ui={{ Navbar, Hero: HeroSplit, LogoCloud, FeatureGrid, StatsBand, TestimonialsWall, PricingTable, Faq, CtaBanner, Footer }}
    />
  );
}
