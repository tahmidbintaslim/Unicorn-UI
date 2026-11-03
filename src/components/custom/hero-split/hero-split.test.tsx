import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { HeroSplit } from "./hero-split";
import { HeroSplitMotion } from "./hero-split-motion";

const props = {
  title: "Analytics you can read",
  description: "See usage by feature.",
  primaryAction: { label: "Start free", href: "/start" },
  media: <div role="img" aria-label="Dashboard" />,
};

describe("HeroSplit", () => {
  it("renders heading, description and actions", () => {
    render(<HeroSplit {...props} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
    expect(screen.getByText(props.description)).toBeTruthy();
    expect(screen.getByRole("link", { name: "Start free" }).getAttribute("href")).toBe("/start");
    expect(screen.getByRole("img", { name: "Dashboard" })).toBeTruthy();
  });
  it("mediaPosition left orders the media first from lg", () => {
    const { container, rerender } = render(<HeroSplit {...props} mediaPosition="left" />);
    expect(container.querySelector('[data-slot="hero-media"]')?.className).toContain("lg:order-1");
    rerender(<HeroSplit {...props} />);
    expect(container.querySelector('[data-slot="hero-media"]')?.className).not.toContain("lg:order-1");
  });
});

describe("HeroSplitMotion", () => {
  it("renders the same content", () => {
    render(<HeroSplitMotion {...props} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
    expect(screen.getByRole("img", { name: "Dashboard" })).toBeTruthy();
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroSplitMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<HeroSplitMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
