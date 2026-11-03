import { render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { HeroPlates } from "./hero-plates";
import { HeroPlatesMotion } from "./hero-plates-motion";

const props = { title: "A page, plate by plate", plates: ["Navbar", "Hero", "Pricing", "Footer"].map((label) => ({ label })) };

describe("HeroPlates", () => {
  it("renders one plate per item in order", () => {
    render(<HeroPlates {...props} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items.map((li) => li.textContent)).toEqual(["Navbar", "Hero", "Pricing", "Footer"]);
  });
});
describe("HeroPlatesMotion", () => {
  it("plates are a list", () => {
    render(<HeroPlatesMotion {...props} />);
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(4);
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroPlatesMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<HeroPlatesMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(textOf(html)).toContain("Pricing");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
