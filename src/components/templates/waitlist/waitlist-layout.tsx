import type * as React from "react";
import type { FaqTwoColumn } from "@/components/custom/faq-two-column/faq-two-column";
import type { FeatureRows } from "@/components/custom/feature-rows/feature-rows";
import type { FooterSimple } from "@/components/custom/footer-simple/footer-simple";
import type { HeroWaitlistProps } from "@/components/custom/hero-waitlist/hero-waitlist";
import type { NavbarFloating } from "@/components/custom/navbar-floating/navbar-floating";
import type { SocialProof } from "@/components/custom/social-proof/social-proof";
import { ProductShot } from "../product-shot";
import type { WaitlistContent } from "./content";

export interface WaitlistUi {
  Navbar: typeof NavbarFloating;
  // Plain and motion heroes differ only in their onSubmit signature, which templates never pass.
  Hero: React.ComponentType<Omit<HeroWaitlistProps, "onSubmit">>;
  SocialProof: typeof SocialProof;
  FeatureRows: typeof FeatureRows;
  Faq: typeof FaqTwoColumn;
  Footer: typeof FooterSimple;
}

/** A complete pre-launch waitlist page. */
export function WaitlistLayout({ c, ui }: { c: WaitlistContent; ui: WaitlistUi }) {
  const { Navbar, Hero, SocialProof, FeatureRows, Faq, Footer } = ui;
  return (
    <>
      <Navbar brand={c.brand.name} brandHref={c.brand.href} links={c.nav.links} action={c.nav.action} />
      <main>
        <Hero id="join" {...c.hero} />
        <SocialProof text={c.proof.text} people={c.proof.people.map((name) => ({ name }))} className="-mt-6 pb-8" />
        <FeatureRows id="features" title={c.features.title} rows={c.features.rows.map((r) => ({ ...r, media: <ProductShot label={`Sample screen: ${r.label}`} /> }))} />
        <Faq id="faq" {...c.faq} />
      </main>
      <Footer brand={c.brand.name} {...c.footer} />
    </>
  );
}
