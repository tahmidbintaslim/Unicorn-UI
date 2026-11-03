import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Pricing } from "./pricing";

describe("Pricing", () => {
  it("pricing shows no numeric Pro price", () => {
    render(<Pricing />);
    const pro = screen.getByRole("listitem", { name: "Pro" });
    expect(pro.textContent).not.toMatch(/\$\s*\d/);
    expect(within(pro).getByText("Coming soon")).toBeTruthy();
  });
  it("free plan lists plain and motion sections", () => {
    render(<Pricing />);
    const free = screen.getByRole("listitem", { name: "Free" });
    expect(free.textContent).toContain("$0");
    expect(free.textContent).toMatch(/plain and motion/i);
  });
});
