import { FaqTwoColumn } from "@/components/custom/faq-two-column/faq-two-column";
import { FeatureRowsMotion } from "@/components/custom/feature-rows/feature-rows-motion";
import { FooterSimple } from "@/components/custom/footer-simple/footer-simple";
import { HeroWaitlistMotion } from "@/components/custom/hero-waitlist/hero-waitlist-motion";
import { NavbarFloatingMotion } from "@/components/custom/navbar-floating/navbar-floating-motion";
import { SocialProofMotion } from "@/components/custom/social-proof/social-proof-motion";
import { mergeContent, type ContentOverrides } from "../merge";
import { waitlistContent, type WaitlistContent } from "./content";
import { WaitlistLayout } from "./waitlist-layout";

/** The waitlist template with motion sections where they exist. */
export function WaitlistTemplateMotion({ content }: { content?: ContentOverrides<WaitlistContent> }) {
  return (
    <WaitlistLayout
      c={mergeContent(waitlistContent, content)}
      ui={{
        Navbar: NavbarFloatingMotion,
        Hero: HeroWaitlistMotion,
        SocialProof: SocialProofMotion,
        FeatureRows: FeatureRowsMotion,
        Faq: FaqTwoColumn,
        Footer: FooterSimple,
      }}
    />
  );
}
