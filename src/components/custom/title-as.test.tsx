import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ComingSoon } from "./coming-soon/coming-soon";
import { Hero } from "./hero/hero";
import { HeroMotion } from "./hero/hero-motion";
import { HeroCommand } from "./hero-command/hero-command";
import { HeroCommandMotion } from "./hero-command/hero-command-motion";
import { HeroMarquee } from "./hero-marquee/hero-marquee";
import { HeroMarqueeMotion } from "./hero-marquee/hero-marquee-motion";
import { HeroPlates } from "./hero-plates/hero-plates";
import { HeroPlatesMotion } from "./hero-plates/hero-plates-motion";
import { HeroShowcase } from "./hero-showcase/hero-showcase";
import { HeroShowcaseMotion } from "./hero-showcase/hero-showcase-motion";
import { HeroSplit } from "./hero-split/hero-split";
import { HeroSplitMotion } from "./hero-split/hero-split-motion";
import { HeroSpotlight } from "./hero-spotlight/hero-spotlight";
import { HeroSpotlightMotion } from "./hero-spotlight/hero-spotlight-motion";
import { HeroThemeCycle } from "./hero-theme-cycle/hero-theme-cycle";
import { HeroThemeCycleMotion } from "./hero-theme-cycle/hero-theme-cycle-motion";
import { HeroVideo } from "./hero-video/hero-video";
import { HeroVideoMotion } from "./hero-video/hero-video-motion";
import { HeroWaitlist } from "./hero-waitlist/hero-waitlist";
import { HeroWaitlistMotion } from "./hero-waitlist/hero-waitlist-motion";
import { NotFound } from "./not-found/not-found";
import { NotFoundMotion } from "./not-found/not-found-motion";

const t = { title: "Sample title", titleAs: "h2" as const };
const video = { poster: "/p.webp", posterAlt: "Tour", videoSrc: "/v.mp4" };
const cases: [string, React.ReactElement][] = [
  ["Hero", <Hero key="1" {...t} />],
  ["HeroMotion", <HeroMotion key="2" {...t} />],
  ["HeroCommand", <HeroCommand key="3" {...t} command="npx x" />],
  ["HeroCommandMotion", <HeroCommandMotion key="4" {...t} command="npx x" />],
  ["HeroMarquee", <HeroMarquee key="5" {...t} items={[{ name: "Acme" }]} />],
  ["HeroMarqueeMotion", <HeroMarqueeMotion key="6" {...t} items={[{ name: "Acme" }]} />],
  ["HeroPlates", <HeroPlates key="7" {...t} plates={[{ label: "Nav" }]} />],
  ["HeroPlatesMotion", <HeroPlatesMotion key="8" {...t} plates={[{ label: "Nav" }]} />],
  ["HeroShowcase", <HeroShowcase key="9" {...t}>x</HeroShowcase>],
  ["HeroShowcaseMotion", <HeroShowcaseMotion key="10" {...t}>x</HeroShowcaseMotion>],
  ["HeroSplit", <HeroSplit key="11" {...t} media={<span>m</span>} />],
  ["HeroSplitMotion", <HeroSplitMotion key="12" {...t} media={<span>m</span>} />],
  ["HeroSpotlight", <HeroSpotlight key="13" {...t} />],
  ["HeroSpotlightMotion", <HeroSpotlightMotion key="14" {...t} />],
  ["HeroThemeCycle", <HeroThemeCycle key="15" {...t} accentWord="title" />],
  ["HeroThemeCycleMotion", <HeroThemeCycleMotion key="16" {...t} accentWord="title" />],
  ["HeroVideo", <HeroVideo key="17" {...t} {...video} />],
  ["HeroVideoMotion", <HeroVideoMotion key="18" {...t} {...video} />],
  ["HeroWaitlist", <HeroWaitlist key="19" {...t} action="/w" />],
  ["HeroWaitlistMotion", <HeroWaitlistMotion key="20" {...t} action="/w" />],
  ["NotFound", <NotFound key="21" {...t} />],
  ["NotFoundMotion", <NotFoundMotion key="22" {...t} />],
  ["ComingSoon", <ComingSoon key="23" {...t} action="/notify" />],
];

afterEach(() => vi.restoreAllMocks());

// Site previews render heroes inside pages that already have an h1.
describe.each(cases)("%s with titleAs=\"h2\"", (_, el) => {
  it("renders the title as h2, never h1, and keeps titleAs off the DOM", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(el);
    expect(container.querySelector("h1")).toBeNull();
    expect(container.querySelector("h2")?.textContent).toContain("Sample");
    expect(container.querySelector("[titleas]")).toBeNull();
    expect(errors.mock.calls.flat().join(" ")).not.toMatch(/titleAs/);
  });
});
