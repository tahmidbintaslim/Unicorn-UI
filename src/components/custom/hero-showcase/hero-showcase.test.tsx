import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { HeroShowcase } from "./hero-showcase";
import { HeroShowcaseMotion } from "./hero-showcase-motion";

const props = { title: "See it working", primaryAction: { label: "Try it", href: "/try" }, children: <button type="button">Live widget</button> };

describe("HeroShowcase", () => {
  it("renders heading, description and actions", () => {
    render(<HeroShowcase {...props} description="Below is the real thing." />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
    expect(screen.getByText("Below is the real thing.")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Try it" })).toBeTruthy();
  });
  it("renders children inside the frame", () => {
    const { container } = render(<HeroShowcase {...props} />);
    expect(container.querySelector('[data-slot="showcase-frame"]')?.textContent).toContain("Live widget");
  });
});
describe("HeroShowcaseMotion", () => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroShowcaseMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
    expect(screen.getByRole("button", { name: "Live widget" })).toBeTruthy();
  });
  it("SSR output is visible", () => {
    const html = renderToString(<HeroShowcaseMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
