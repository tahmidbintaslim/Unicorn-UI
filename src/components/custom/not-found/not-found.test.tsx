import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { NotFound } from "./not-found";
import { NotFoundMotion } from "./not-found-motion";

describe("NotFound", () => {
  it("has one h1 and a link home", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Page not found");
    expect(screen.getByRole("link", { name: "Back to home" }).getAttribute("href")).toBe("/");
  });
});
describe("NotFoundMotion", () => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<NotFoundMotion />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<NotFoundMotion />);
    expect(textOf(html)).toContain("Page not found");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
