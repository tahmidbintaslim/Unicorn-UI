import { act } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BentoGridMotion } from "./bento-grid/bento-grid-motion";
import { BlogGridMotion } from "./blog-grid/blog-grid-motion";
import { CtaBannerMotion } from "./cta-banner/cta-banner-motion";
import { CtaSplitMotion } from "./cta-split/cta-split-motion";
import { FaqMotion } from "./faq/faq-motion";
import { FeatureGridMotion } from "./feature-grid/feature-grid-motion";
import { FeatureRowsMotion } from "./feature-rows/feature-rows-motion";
import { HeroMarqueeMotion } from "./hero-marquee/hero-marquee-motion";
import { HeroPlatesMotion } from "./hero-plates/hero-plates-motion";
import { HeroThemeCycleMotion } from "./hero-theme-cycle/hero-theme-cycle-motion";
import { HeroVideoMotion } from "./hero-video/hero-video-motion";
import { IntegrationsGridMotion } from "./integrations-grid/integrations-grid-motion";
import { LogoCloudMotion } from "./logo-cloud/logo-cloud-motion";
import { NavbarMotion } from "./navbar/navbar-motion";
import { NavbarFloatingMotion } from "./navbar-floating/navbar-floating-motion";
import { NotFoundMotion } from "./not-found/not-found-motion";
import { SocialProofMotion } from "./social-proof/social-proof-motion";
import { StatsBandMotion } from "./stats-band/stats-band-motion";
import { TestimonialHighlightMotion } from "./testimonial-highlight/testimonial-highlight-motion";
import { TestimonialsWallMotion } from "./testimonials-wall/testimonials-wall-motion";

// Motion versions must hydrate the server's DOM in place, not swap in a new tree
// after mount: a swap drops keyboard focus a visitor set before hydration finished.
const CASES: [string, React.ReactElement][] = [
  ["FeatureGridMotion", <FeatureGridMotion key="fg" title="T" items={[{ title: "A", description: "a" }, { title: "B", description: "b" }]} />],
  ["FeatureRowsMotion", <FeatureRowsMotion key="fr" title="T" rows={[{ title: "A", description: "a", media: <a href="#m">m</a> }]} />],
  ["IntegrationsGridMotion", <IntegrationsGridMotion key="ig" title="T" items={[{ name: "A", href: "#a" }, { name: "B" }]} />],
  ["NavbarMotion", <NavbarMotion key="nb" brand="B" links={[{ label: "Docs", href: "#d" }]} />],
  ["CtaBannerMotion", <CtaBannerMotion key="cb" title="T" actionLabel="Go" actionHref="#" />],
  ["CtaSplitMotion", <CtaSplitMotion key="cs" title="T" primaryAction={{ label: "Go", href: "#" }} media={<a href="#m">m</a>} />],
  ["BentoGridMotion", <BentoGridMotion key="bg" title="T" items={[{ title: "A", description: "a" }]} />],
  ["BlogGridMotion", <BlogGridMotion key="bl" title="T" posts={[{ title: "A", excerpt: "a", author: "Fictional", href: "#a", date: "2026-01-01" }]} />],
  ["StatsBandMotion", <StatsBandMotion key="sb" title="T" stats={[{ value: 10, label: "A" }]} />],
  ["FaqMotion", <FaqMotion key="fq" items={[{ question: "Q", answer: "A" }]} />],
  ["SocialProofMotion", <SocialProofMotion key="sp" text="Fictional" people={[{ name: "A" }]} rating={4} />],
  ["LogoCloudMotion", <LogoCloudMotion key="lc" logos={[{ name: "A" }, { name: "B" }]} />],
  ["HeroVideoMotion", <HeroVideoMotion key="hv" titleAs="h2" title="T" poster="/p.jpg" posterAlt="Demo" videoSrc="/v.mp4" />],
  ["HeroMarqueeMotion", <HeroMarqueeMotion key="hm" titleAs="h2" title="T" items={[{ name: "A" }, { name: "B" }]} />],
  ["HeroThemeCycleMotion", <HeroThemeCycleMotion key="ht" titleAs="h2" title="Ship fast" accentWord="fast" />],
  ["HeroPlatesMotion", <HeroPlatesMotion key="hp" titleAs="h2" title="T" plates={[{ label: "Nav" }, { label: "Hero" }]} />],
  ["TestimonialHighlightMotion", <TestimonialHighlightMotion key="th" quote="It works" author="A" />],
  ["TestimonialsWallMotion", <TestimonialsWallMotion key="tw" title="T" items={[{ quote: "Q", author: "A" }]} />],
  ["NotFoundMotion", <NotFoundMotion key="nf" />],
  ["NavbarFloatingMotion", <NavbarFloatingMotion key="nv" brand="B" links={[{ label: "Docs", href: "#d" }]} />],
];

describe("motion sections keep the server DOM after hydration", () => {
  it.each(CASES)("%s", async (_, el) => {
    const host = document.createElement("div");
    host.innerHTML = renderToString(el);
    document.body.append(host);
    const before = host.querySelector("h2, h3, a, button, li, blockquote, p");
    expect(before).not.toBeNull();
    await act(async () => {
      hydrateRoot(host, el);
    });
    expect(host.contains(before)).toBe(true);
    host.remove();
  });
});
