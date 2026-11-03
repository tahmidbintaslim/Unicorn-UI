import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { FeatureRows } from "./feature-rows";
import { FeatureRowsMotion } from "./feature-rows-motion";

const rows = [
  { title: "Install in one line", description: "Use the shadcn CLI.", media: <div role="img" aria-label="CLI" /> },
  { title: "Edit like your code", description: "It is your code.", media: <div role="img" aria-label="Editor" /> },
];

describe("FeatureRows", () => {
  it("alternates media side", () => {
    const { container } = render(<FeatureRows rows={rows} />);
    const media = container.querySelectorAll('[data-slot="row-media"]');
    expect(media[0].className).not.toContain("lg:order-first");
    expect(media[1].className).toContain("lg:order-first");
  });
  it("each row has an h3 and its media", () => {
    render(<FeatureRows rows={rows} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
    expect(screen.getByRole("img", { name: "Editor" })).toBeTruthy();
  });
});
describe("FeatureRowsMotion", () => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<FeatureRowsMotion rows={rows} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<FeatureRowsMotion rows={rows} />);
    expect(textOf(html)).toContain("It is your code.");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
