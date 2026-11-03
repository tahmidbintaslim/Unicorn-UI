import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { mockReducedMotion } from "@/test/motion";
import { Reveal } from "./reveal";

afterEach(() => mockReducedMotion(false));

describe("Reveal", () => {
  it("server HTML is visible", () => {
    const html = renderToString(<Reveal>Hello</Reveal>);
    expect(html).toContain("Hello");
    expect(html).not.toMatch(/opacity|data-reveal/);
  });
  it("reduced motion renders a plain wrapper", () => {
    mockReducedMotion(true);
    const { container } = render(<Reveal className="x">Hi</Reveal>);
    expect(container.querySelector("[data-reveal]")).toBeNull();
    expect(screen.getByText("Hi")).toBeTruthy();
  });
  it("with motion allowed, waits for view using CSS only", () => {
    const { container } = render(<Reveal>Hi</Reveal>);
    expect(container.querySelector("[data-reveal]")?.getAttribute("data-reveal")).toBe("out");
  });
  it("does not load the motion library", () => {
    expect(readFileSync("src/app/_site/reveal.tsx", "utf8")).not.toContain('"motion/react"');
  });
});
