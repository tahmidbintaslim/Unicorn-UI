import { render, screen } from "@testing-library/react";
import { Zap } from "lucide-react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { FeatureGrid } from "./feature-grid";
import { FeatureGridMotion } from "./feature-grid-motion";

const items = [
  { title: "Fast", description: "No runtime.", icon: Zap },
  { title: "Themed", description: "Uses your tokens." },
];

describe("FeatureGrid", () => {
  it("accepts a rendered icon element, so server pages can pass icons to the motion version", () => {
    const { container } = render(<FeatureGridMotion items={[{ title: "Fast", description: "Quick.", icon: <Zap data-testid="el-icon" /> }]} />);
    expect(screen.getByTestId("el-icon")).toBeTruthy();
    expect(container.querySelector("span.bg-primary\\/10")).not.toBeNull();
  });

  it("renders an h2 and one h3 per feature in a list", () => {
    render(<FeatureGrid title="Why it works" items={items} />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Why it works");
    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual(["Fast", "Themed"]);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
  it("renders nothing extra for an empty list", () => {
    const { container } = render(<FeatureGrid title="x" items={[]} />);
    expect(container.querySelector("ul")).toBeNull();
  });
});
describe("FeatureGridMotion", () => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<FeatureGridMotion items={items} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<FeatureGridMotion items={items} />);
    expect(textOf(html)).toContain("Uses your tokens.");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
