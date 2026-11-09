import { ComparisonTable } from "@/components/custom/comparison-table/comparison-table";
import { CtaBanner } from "@/components/custom/cta-banner/cta-banner";
import { Faq } from "@/components/custom/faq/faq";
import { Footer } from "@/components/custom/footer/footer";
import { Hero } from "@/components/custom/hero/hero";
import { Navbar } from "@/components/custom/navbar/navbar";
import { PricingTable } from "@/components/custom/pricing-table/pricing-table";
import { mergeContent, type ContentOverrides } from "../merge";
import { pricingContent, type PricingContent } from "./content";
import { PricingLayout } from "./pricing-layout";

/** Free pricing page template, built only from plain Tapas sections. */
export function PricingTemplate({ content }: { content?: ContentOverrides<PricingContent> }) {
  return (
    <PricingLayout
      c={mergeContent(pricingContent, content)}
      ui={{ Navbar, Hero, PricingTable, ComparisonTable, Faq, CtaBanner, Footer }}
    />
  );
}
