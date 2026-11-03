import { FaqTwoColumn } from "@/components/custom/faq-two-column/faq-two-column";
import { FeatureRows } from "@/components/custom/feature-rows/feature-rows";
import { FooterSimple } from "@/components/custom/footer-simple/footer-simple";
import { HeroWaitlist } from "@/components/custom/hero-waitlist/hero-waitlist";
import { NavbarFloating } from "@/components/custom/navbar-floating/navbar-floating";
import { SocialProof } from "@/components/custom/social-proof/social-proof";
import { mergeContent, type ContentOverrides } from "../merge";
import { waitlistContent, type WaitlistContent } from "./content";
import { WaitlistLayout } from "./waitlist-layout";

/** Free waitlist / pre-launch template, built only from plain Tapas sections. */
export function WaitlistTemplate({ content }: { content?: ContentOverrides<WaitlistContent> }) {
  return (
    <WaitlistLayout
      c={mergeContent(waitlistContent, content)}
      ui={{ Navbar: NavbarFloating, Hero: HeroWaitlist, SocialProof, FeatureRows, Faq: FaqTwoColumn, Footer: FooterSimple }}
    />
  );
}
