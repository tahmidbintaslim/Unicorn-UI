// @vitest-environment node
// Real server render (no window): catches markup that differs between the
// server and the first client render, which jsdom-based "SSR" tests miss.
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { textOf as text } from "@/test/motion";
import { StarButton } from "@/app/_site/star-button";
import { HeroCommandMotion } from "./hero-command";
import { HeroMarqueeMotion } from "./hero-marquee";
import { HeroMotion } from "./hero";
import { HeroPlatesMotion } from "./hero-plates";
import { HeroShowcaseMotion } from "./hero-showcase";
import { HeroSplitMotion } from "./hero-split";
import { HeroSpotlightMotion } from "./hero-spotlight";
import { HeroThemeCycleMotion } from "./hero-theme-cycle";
import { HeroVideoMotion } from "./hero-video";
import { HeroWaitlistMotion } from "./hero-waitlist";

const title = "Server rendered title";
const cases: [string, React.ReactElement][] = [
  ["hero", <HeroMotion key="a" title={title} />],
  ["split", <HeroSplitMotion key="b" title={title} media={<span>m</span>} />],
  ["command", <HeroCommandMotion key="c" title={title} command="npx x" />],
  ["spotlight", <HeroSpotlightMotion key="d" title={title} />],
  ["showcase", <HeroShowcaseMotion key="e" title={title}>x</HeroShowcaseMotion>],
  ["waitlist", <HeroWaitlistMotion key="f" title={title} action="/w" />],
  ["marquee", <HeroMarqueeMotion key="g" title={title} items={[{ name: "Acme" }]} />],
  ["video", <HeroVideoMotion key="h" title={title} poster="/p.webp" posterAlt="Tour" videoSrc="/v.mp4" />],
  ["theme-cycle", <HeroThemeCycleMotion key="i" title={title} accentWord="title" />],
  ["plates", <HeroPlatesMotion key="j" title={title} plates={[{ label: "Nav" }]} />],
];

describe("motion heroes on a real server render", () => {
  it.each(cases)("%s shows its title at full opacity", (_, el) => {
    const html = renderToString(el);
    expect(text(html)).toContain(title);
    expect(html).not.toMatch(/opacity:\s*0[;".]/);
  });
  it("video renders the plain player on the server, matching the first client render", () => {
    const html = renderToString(cases[7][1]);
    expect(html).toContain("<video");
    expect(html).not.toContain("Play video");
  });
  it("star count is not dimmed or shrunk in server HTML", () => {
    const html = renderToString(<StarButton count={12} />);
    expect(html).toContain("12");
    expect(html).not.toMatch(/opacity:\s*0\.4|scale\(0\.6\)/);
  });
});
