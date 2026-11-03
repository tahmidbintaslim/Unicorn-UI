import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ComparisonTable } from "./comparison-table";

const props = {
  caption: "Plans compared",
  plans: ["Free", "Pro"],
  rows: [
    { feature: "Projects", values: ["1", "Unlimited"] },
    { feature: "Reports", values: [false, true] },
  ],
};

describe("ComparisonTable", () => {
  it("has a caption and row headers", () => {
    render(<ComparisonTable {...props} />);
    expect(screen.getByRole("table", { name: "Plans compared" })).toBeTruthy();
    expect(screen.getAllByRole("rowheader").map((th) => th.textContent)).toEqual(["Projects", "Reports"]);
    expect(screen.getAllByRole("columnheader").map((th) => th.textContent)).toEqual(["Feature", "Free", "Pro"]);
  });
  it("booleans read as Included / Not included", () => {
    render(<ComparisonTable {...props} />);
    expect(screen.getByText("Included")).toBeTruthy();
    expect(screen.getByText("Not included")).toBeTruthy();
  });
  it("scrolls inside its own focusable region", () => {
    render(<ComparisonTable {...props} />);
    const region = screen.getByRole("region", { name: "Plans compared" });
    expect(region.getAttribute("tabindex")).toBe("0");
    expect(region.className).toContain("overflow-x-auto");
  });
});
