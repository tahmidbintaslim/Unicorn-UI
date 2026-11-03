import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { CtaSplit } from "./cta-split";
import { CtaSplitMotion } from "./cta-split-motion";

const props = { title: "Ready to ship?", description: "Start free.", primaryAction: { label: "Start", href: "/s" }, media: <div role="img" aria-label="Shot" /> };

describe("CtaSplit", () => {
  it("renders an h2, action and media", () => {
    render(<CtaSplit {...props} />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(props.title);
    expect(screen.getByRole("link", { name: "Start" }).getAttribute("href")).toBe("/s");
    expect(screen.getByRole("img", { name: "Shot" })).toBeTruthy();
  });
});
describe("CtaSplitMotion", () => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<CtaSplitMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<CtaSplitMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
