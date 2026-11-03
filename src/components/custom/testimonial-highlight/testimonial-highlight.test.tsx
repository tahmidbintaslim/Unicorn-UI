import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { TestimonialHighlight } from "./testimonial-highlight";
import { TestimonialHighlightMotion } from "./testimonial-highlight-motion";

const props = { quote: "We shipped the new site in a day.", author: "Sam Lee", role: "CTO", company: "Example Co" };

describe("TestimonialHighlight", () => {
  it("renders a blockquote with a cited author", () => {
    const { container } = render(<TestimonialHighlight {...props} />);
    expect(container.querySelector("blockquote")?.textContent).toContain(props.quote);
    expect(container.querySelector("figcaption")?.textContent).toContain("Sam Lee");
  });
});
describe("TestimonialHighlightMotion", () => {
  it("keeps the full quote as one text for screen readers", () => {
    render(<TestimonialHighlightMotion {...props} />);
    expect(screen.getByText(props.quote, { selector: ".sr-only" })).toBeTruthy();
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<TestimonialHighlightMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<TestimonialHighlightMotion {...props} />);
    expect(textOf(html)).toContain("Sam Lee");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
