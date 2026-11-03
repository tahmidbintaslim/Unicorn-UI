import { render, screen } from "@testing-library/react";
import { Copy, Users } from "lucide-react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { BlogCardMotion } from "./blog-card/blog-card-motion";
import { FeatureCardMotion } from "./feature-card/feature-card-motion";
import { InteractiveCardMotion } from "./interactive-card/interactive-card-motion";
import { PricingCardMotion } from "./pricing-card/pricing-card-motion";
import { StatisticsCardMotion } from "./statistics-card/statistics-card-motion";
import { TestimonialCardMotion } from "./testimonial-card/testimonial-card-motion";

afterEach(() => mockReducedMotion(false));

const cases: [string, () => React.ReactElement, string][] = [
  ["PricingCardMotion", () => <PricingCardMotion name="Pro" price={19} features={[{ text: "10 projects", included: true }]} ctaText="Start" />, "10 projects"],
  ["TestimonialCardMotion", () => <TestimonialCardMotion testimonial="Sample quote." author="Sam" />, "Sample quote."],
  ["FeatureCardMotion", () => <FeatureCardMotion title="Copy" description="Paste it." icon={Copy} />, "Paste it."],
  ["StatisticsCardMotion", () => <StatisticsCardMotion title="Users" value={1250} icon={Users} />, "1,250"],
  ["BlogCardMotion", () => <BlogCardMotion title="A post" excerpt="Sample." author="Ana" date="2026-01-15" />, "A post"],
  ["InteractiveCardMotion", () => <InteractiveCardMotion title="Kit" description="All in one." />, "All in one."],
];

describe.each(cases)("%s", (_, make, text) => {
  it("reduced motion renders plain (no hover lift wired)", () => {
    mockReducedMotion(true);
    const { container } = render(make());
    expect(container.querySelector('[data-motion-lift="on"]')).toBeNull();
    expect(animatedElements(container)).toHaveLength(0);
  });

  it("SSR output is visible", () => {
    const html = renderToString(make());
    expect(textOf(html)).toContain(text);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });

  it("wires the hover lift when motion is allowed", () => {
    const { container } = render(make());
    expect(container.querySelector('[data-motion-lift="on"]')).not.toBeNull();
  });
});

describe("StatisticsCardMotion", () => {
  it("keeps the final value for screen readers while the number counts", () => {
    render(<StatisticsCardMotion title="Users" value={1250} />);
    expect(screen.getByText("1,250", { selector: ".sr-only" })).toBeTruthy();
  });

  it("counts numeric strings such as 125,430 and leaves other text alone", () => {
    const { container, rerender } = render(<StatisticsCardMotion title="Users" value="125,430" />);
    expect(container.querySelector("[data-stat-value]")?.getAttribute("data-stat-value")).toBe("125430");
    rerender(<StatisticsCardMotion title="Users" value="N/A" />);
    expect(container.querySelector("[data-stat-value]")).toBeNull();
  });
});
