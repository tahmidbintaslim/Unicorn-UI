import { AnnouncementBar } from "@/components/custom/announcement-bar/announcement-bar";
import { ComparisonTable } from "@/components/custom/comparison-table/comparison-table";
import { CtaSplit } from "@/components/custom/cta-split/cta-split";
import { FeatureGrid } from "@/components/custom/feature-grid/feature-grid";
import { Footer } from "@/components/custom/footer/footer";
import { HeroSpotlight } from "@/components/custom/hero-spotlight/hero-spotlight";
import { IntegrationsGrid } from "@/components/custom/integrations-grid/integrations-grid";
import { Navbar } from "@/components/custom/navbar/navbar";
import { PricingTable } from "@/components/custom/pricing-table/pricing-table";
import { Steps } from "@/components/custom/steps/steps";
import { mergeContent, type ContentOverrides } from "../merge";
import { AiLayout } from "./ai-layout";
import { aiContent, type AiContent } from "./content";

/** Free AI product landing page template, built only from plain Tapas sections. */
export function AiTemplate({ content }: { content?: ContentOverrides<AiContent> }) {
  return (
    <AiLayout
      c={mergeContent(aiContent, content)}
      ui={{ AnnouncementBar, Navbar, Hero: HeroSpotlight, FeatureGrid, Steps, IntegrationsGrid, ComparisonTable, PricingTable, CtaSplit, Footer }}
    />
  );
}
