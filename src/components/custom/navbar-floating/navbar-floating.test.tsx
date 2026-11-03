import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { NavbarFloating } from "./navbar-floating";
import { NavbarFloatingMotion } from "./navbar-floating-motion";

const props = { brand: "Acme", links: [{ label: "Pricing", href: "/pricing" }], action: { label: "Sign up", href: "/signup" } };

describe("NavbarFloating", () => {
  it("links in nav aria-label Main", () => {
    render(<NavbarFloating {...props} />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav.querySelector('a[href="/pricing"]')).toBeTruthy();
    expect(screen.getByRole("link", { name: "Sign up" })).toBeTruthy();
  });
});
describe("NavbarFloatingMotion", () => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<NavbarFloatingMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<NavbarFloatingMotion {...props} />);
    expect(textOf(html)).toContain("Acme");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
