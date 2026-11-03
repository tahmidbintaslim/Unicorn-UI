import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { HeroSpotlight } from "./hero-spotlight";
import { HeroSpotlightMotion } from "./hero-spotlight-motion";

const props = { title: "Built in the dark", description: "A grid and a glow.", primaryAction: { label: "Start", href: "/start" } };

describe("HeroSpotlight", () => {
  it("renders heading, description and actions", () => {
    render(<HeroSpotlight {...props} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
    expect(screen.getByRole("link", { name: "Start" })).toBeTruthy();
  });
  it("grid layer is aria-hidden", () => {
    const { container } = render(<HeroSpotlight {...props} />);
    expect(container.querySelector('[data-slot="spotlight-grid"]')?.getAttribute("aria-hidden")).toBe("true");
  });
});
describe("HeroSpotlightMotion", () => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroSpotlightMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<HeroSpotlightMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
