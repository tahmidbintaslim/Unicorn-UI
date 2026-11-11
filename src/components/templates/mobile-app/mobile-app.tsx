import { CtaSplit } from "@/components/custom/cta-split/cta-split";
import { FeatureRows } from "@/components/custom/feature-rows/feature-rows";
import { Footer } from "@/components/custom/footer/footer";
import { HeroSplit } from "@/components/custom/hero-split/hero-split";
import { NavbarFloating } from "@/components/custom/navbar-floating/navbar-floating";
import { TestimonialsWall } from "@/components/custom/testimonials-wall/testimonials-wall";
import { mergeContent, type ContentOverrides } from "../merge";
import { mobileAppContent, type MobileAppContent } from "./content";
import { MobileAppLayout } from "./mobile-app-layout";

/** Free mobile app landing page template, built only from plain Tapas sections. */
export function MobileAppTemplate({ content }: { content?: ContentOverrides<MobileAppContent> }) {
  return (
    <MobileAppLayout
      c={mergeContent(mobileAppContent, content)}
      ui={{ Navbar: NavbarFloating, Hero: HeroSplit, FeatureRows, TestimonialsWall, CtaSplit, Footer }}
    />
  );
}
