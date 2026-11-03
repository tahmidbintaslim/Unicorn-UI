import { fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { HeroMarquee } from "./hero-marquee";
import { HeroMarqueeMotion } from "./hero-marquee-motion";

const props = { title: "Used across the stack", items: ["Acme", "Globex", "Initech"].map((name) => ({ name })) };

describe("HeroMarquee", () => {
  it("renders heading and each item once", () => {
    render(<HeroMarquee {...props} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
    expect(screen.getAllByText("Acme")).toHaveLength(1);
  });
});
describe("HeroMarqueeMotion", () => {
  it("second copy is aria-hidden and inert", () => {
    const { container } = render(<HeroMarqueeMotion {...props} />);
    const clone = container.querySelector('[data-slot="marquee-clone"]');
    expect(clone?.getAttribute("aria-hidden")).toBe("true");
    expect(clone?.hasAttribute("inert")).toBe(true);
    expect(screen.getAllByText("Acme")).toHaveLength(2);
  });
  it("pause button toggles aria-pressed", () => {
    render(<HeroMarqueeMotion {...props} />);
    const btn = screen.getByRole("button", { name: "Pause scrolling" });
    expect(btn.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroMarqueeMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
    expect(screen.getAllByText("Acme")).toHaveLength(1);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<HeroMarqueeMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
