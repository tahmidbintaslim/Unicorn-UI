import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { mockReducedMotion, textOf } from "@/test/motion";
import { HeroMotion } from "./hero-motion";

const props = {
  eyebrow: "New",
  title: "Ship faster",
  description: "Copy the sections you need.",
  primaryAction: { label: "Start", href: "/start" },
  secondaryAction: { label: "Docs", href: "/docs" },
};

describe("HeroMotion", () => {
  it("renders the same heading and links as Hero", () => {
    render(<HeroMotion {...props} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Ship faster");
    expect(screen.getByRole("link", { name: "Start" }).getAttribute("href")).toBe("/start");
    expect(screen.getByRole("link", { name: "Docs" }).getAttribute("href")).toBe("/docs");
  });

  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroMotion {...props} />);
    const animated = [...container.querySelectorAll<HTMLElement>("*")].filter(
      (el) => el.style.transform || el.style.opacity,
    );
    expect(animated).toHaveLength(0);
  });

  it("SSR output is visible", () => {
    const html = renderToString(<HeroMotion {...props} />);
    expect(textOf(html)).toContain("Ship faster");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
