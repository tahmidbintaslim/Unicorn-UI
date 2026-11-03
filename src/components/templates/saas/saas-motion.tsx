import { CtaBannerMotion } from "@/components/custom/cta-banner/cta-banner-motion";
import { FaqMotion } from "@/components/custom/faq/faq-motion";
import { FeatureGridMotion } from "@/components/custom/feature-grid/feature-grid-motion";
import { Footer } from "@/components/custom/footer/footer";
import { HeroSplitMotion } from "@/components/custom/hero-split/hero-split-motion";
import { LogoCloudMotion } from "@/components/custom/logo-cloud/logo-cloud-motion";
import { Navbar } from "@/components/custom/navbar/navbar";
import { PricingTableMotion } from "@/components/custom/pricing-table/pricing-table-motion";
import { StatsBandMotion } from "@/components/custom/stats-band/stats-band-motion";
import { TestimonialsWallMotion } from "@/components/custom/testimonials-wall/testimonials-wall-motion";
import { mergeContent, type ContentOverrides } from "../merge";
import { saasContent, type SaasContent } from "./content";
import { SaasLayout } from "./saas-layout";

/** The SaaS template with motion sections where they exist; the rest stay plain. */
export function SaasTemplateMotion({ content }: { content?: ContentOverrides<SaasContent> }) {
  return (
    <SaasLayout
      c={mergeContent(saasContent, content)}
      ui={{
        Navbar,
        Hero: HeroSplitMotion,
        LogoCloud: LogoCloudMotion,
        FeatureGrid: FeatureGridMotion,
        StatsBand: StatsBandMotion,
        TestimonialsWall: TestimonialsWallMotion,
        PricingTable: PricingTableMotion,
        Faq: FaqMotion,
        CtaBanner: CtaBannerMotion,
        Footer,
      }}
    />
  );
}
