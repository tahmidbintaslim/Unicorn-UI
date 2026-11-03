import { fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { TestimonialsWall } from "./testimonials-wall";
import { TestimonialsWallMotion } from "./testimonials-wall-motion";

const items = Array.from({ length: 6 }, (_, i) => ({ quote: `Quote number ${i + 1}`, author: `Person ${i + 1}`, role: "Founder" }));

describe("TestimonialsWall", () => {
  it("renders an h2 and every quote once as a figure", () => {
    const { container } = render(<TestimonialsWall title="Loved by builders" items={items} />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Loved by builders");
    expect(container.querySelectorAll("figure")).toHaveLength(6);
    expect(screen.getAllByText(/Quote number 1”/)).toHaveLength(1);
  });
  it("renders nothing extra for an empty list", () => {
    const { container } = render(<TestimonialsWall title="Loved" items={[]} />);
    expect(container.querySelector("figure")).toBeNull();
  });
});
describe("TestimonialsWallMotion", () => {
  it("pause button stops drift", () => {
    render(<TestimonialsWallMotion items={items} />);
    const btn = screen.getByRole("button", { name: "Pause scrolling" });
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
  });
  it("duplicated quotes for the loop are hidden from screen readers", () => {
    const { container } = render(<TestimonialsWallMotion items={items} />);
    const visible = [...container.querySelectorAll("figure")].filter((f) => !f.closest("[aria-hidden=true]"));
    expect(visible).toHaveLength(6);
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<TestimonialsWallMotion items={items} />);
    expect(animatedElements(container)).toHaveLength(0);
    expect(screen.queryByRole("button", { name: "Pause scrolling" })).toBeNull();
  });
  it("SSR output is visible", () => {
    const html = renderToString(<TestimonialsWallMotion items={items} />);
    expect(textOf(html)).toContain("Quote number 1");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
