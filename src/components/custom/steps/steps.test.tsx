import { render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { Steps } from "./steps";
import { StepsMotion } from "./steps-motion";

const steps = [
  { title: "Pick", description: "Choose a section." },
  { title: "Install", description: "Run one command." },
  { title: "Ship", description: "Make it yours." },
];

describe("Steps", () => {
  it("steps are an ordered list", () => {
    render(<Steps title="How it works" steps={steps} />);
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });
});
describe("StepsMotion", () => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<StepsMotion steps={steps} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<StepsMotion steps={steps} />);
    expect(textOf(html)).toContain("Run one command.");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
