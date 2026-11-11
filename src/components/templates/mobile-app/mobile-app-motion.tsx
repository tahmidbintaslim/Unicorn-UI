import { CtaSplitMotion } from "@/components/custom/cta-split/cta-split-motion";
import { FeatureRowsMotion } from "@/components/custom/feature-rows/feature-rows-motion";
import { Footer } from "@/components/custom/footer/footer";
import { HeroSplitMotion } from "@/components/custom/hero-split/hero-split-motion";
import { NavbarFloatingMotion } from "@/components/custom/navbar-floating/navbar-floating-motion";
import { TestimonialsWallMotion } from "@/components/custom/testimonials-wall/testimonials-wall-motion";
import { mergeContent, type ContentOverrides } from "../merge";
import { mobileAppContent, type MobileAppContent } from "./content";
import { MobileAppLayout } from "./mobile-app-layout";

/** The mobile app template with motion sections where they exist; the rest stay plain. */
export function MobileAppTemplateMotion({ content }: { content?: ContentOverrides<MobileAppContent> }) {
  return (
    <MobileAppLayout
      c={mergeContent(mobileAppContent, content)}
      ui={{
        Navbar: NavbarFloatingMotion,
        Hero: HeroSplitMotion,
        FeatureRows: FeatureRowsMotion,
        TestimonialsWall: TestimonialsWallMotion,
        CtaSplit: CtaSplitMotion,
        Footer,
      }}
    />
  );
}
