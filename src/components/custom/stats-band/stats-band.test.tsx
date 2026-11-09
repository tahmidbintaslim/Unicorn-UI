import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { StatsBand } from "./stats-band";
import { StatsBandMotion } from "./stats-band-motion";

const stats = [
  { value: 12000, label: "Installs", suffix: "+" },
  { value: 99.9, label: "Uptime", suffix: "%", decimals: 1 },
];

describe("StatsBand", () => {
  it("renders each stat as a term/definition pair", () => {
    const { container } = render(<StatsBand title="By the numbers" stats={stats} />);
    expect(container.querySelectorAll("dt")).toHaveLength(2);
    expect(screen.getByText("12,000+")).toBeTruthy();
    expect(screen.getByText("99.9%")).toBeTruthy();
  });
  it("renders nothing extra for an empty list", () => {
    const { container } = render(<StatsBand stats={[]} />);
    expect(container.querySelector("dl")).toBeNull();
  });
});
describe("StatsBandMotion", () => {
  it("final numbers are in the DOM before counting", () => {
    const html = renderToString(<StatsBandMotion stats={stats} />);
    expect(textOf(html)).toContain("12,000+");
    expect(textOf(html)).toContain("99.9%");
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<StatsBandMotion stats={stats} />);
    expect(animatedElements(container)).toHaveLength(0);
    // Visible number (aria-hidden) plus its sr-only twin, same markup as the server render.
    expect(screen.getAllByText("12,000+")).toHaveLength(2);
  });
  it("SSR output has no hidden content", () => {
    expect(renderToString(<StatsBandMotion stats={stats} />)).not.toMatch(/opacity:\s*0[;"]/);
  });
});
