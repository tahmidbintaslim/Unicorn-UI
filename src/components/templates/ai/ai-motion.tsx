import { AnnouncementBar } from "@/components/custom/announcement-bar/announcement-bar";
import { ComparisonTable } from "@/components/custom/comparison-table/comparison-table";
import { CtaSplitMotion } from "@/components/custom/cta-split/cta-split-motion";
import { FeatureGridMotion } from "@/components/custom/feature-grid/feature-grid-motion";
import { Footer } from "@/components/custom/footer/footer";
import { HeroSpotlightMotion } from "@/components/custom/hero-spotlight/hero-spotlight-motion";
import { IntegrationsGridMotion } from "@/components/custom/integrations-grid/integrations-grid-motion";
import { Navbar } from "@/components/custom/navbar/navbar";
import { PricingTableMotion } from "@/components/custom/pricing-table/pricing-table-motion";
import { StepsMotion } from "@/components/custom/steps/steps-motion";
import { mergeContent, type ContentOverrides } from "../merge";
import { AiLayout } from "./ai-layout";
import { aiContent, type AiContent } from "./content";

/** The AI product template with motion sections where they exist. */
export function AiTemplateMotion({ content }: { content?: ContentOverrides<AiContent> }) {
  return (
    <AiLayout
      c={mergeContent(aiContent, content)}
      ui={{
        AnnouncementBar,
        Navbar,
        Hero: HeroSpotlightMotion,
        FeatureGrid: FeatureGridMotion,
        Steps: StepsMotion,
        IntegrationsGrid: IntegrationsGridMotion,
        ComparisonTable,
        PricingTable: PricingTableMotion,
        CtaSplit: CtaSplitMotion,
        Footer,
      }}
    />
  );
}
