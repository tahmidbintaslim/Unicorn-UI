import type { CtaSplit } from "@/components/custom/cta-split/cta-split";
import type { FeatureRows } from "@/components/custom/feature-rows/feature-rows";
import type { Footer } from "@/components/custom/footer/footer";
import type { HeroSplit } from "@/components/custom/hero-split/hero-split";
import type { NavbarFloating } from "@/components/custom/navbar-floating/navbar-floating";
import type { TestimonialsWall } from "@/components/custom/testimonials-wall/testimonials-wall";
import { PhoneShot } from "../product-shot";
import type { MobileAppContent } from "./content";

/** The sections a mobile app page is built from; plain and motion entry points pass their own versions. */
export interface MobileAppUi {
  Navbar: typeof NavbarFloating;
  Hero: typeof HeroSplit;
  FeatureRows: typeof FeatureRows;
  TestimonialsWall: typeof TestimonialsWall;
  CtaSplit: typeof CtaSplit;
  Footer: typeof Footer;
}

/** A complete mobile app landing page. */
export function MobileAppLayout({ c, ui }: { c: MobileAppContent; ui: MobileAppUi }) {
  const { Navbar, Hero, FeatureRows, TestimonialsWall, CtaSplit, Footer } = ui;
  return (
    <>
      <Navbar brand={c.brand.name} brandHref={c.brand.href} links={c.nav.links} action={c.nav.action} />
      <main>
        <Hero {...c.hero} media={<PhoneShot label="Sample app screen: today's habits" />} />
        <FeatureRows id="features" title={c.features.title} rows={c.features.rows.map((r) => ({ ...r, media: <PhoneShot label={`Sample app screen: ${r.label}`} /> }))} />
        <TestimonialsWall id="reviews" {...c.testimonials} />
        <CtaSplit id="download" {...c.cta} media={<PhoneShot label="Sample app screen: weekly streaks" />} />
      </main>
      <Footer brand={c.brand.name} {...c.footer} />
    </>
  );
}
