import { render, screen } from "@testing-library/react";
import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SectionCard } from "./section-card";
import { SECTIONS } from "./sections";

describe("SectionCard", () => {
  const s = SECTIONS.find((x) => x.slug === "pricing-table")!;

  it("shows a real preview image, a title link to the docs and copy actions outside the link", () => {
    const { container } = render(<SectionCard section={s} />);
    expect(container.querySelector("img")?.getAttribute("src")).toContain("pricing-table");
    const link = screen.getByRole("link", { name: /Pricing table/ });
    expect(link.getAttribute("href")).toBe("/docs/sections/pricing-table");
    for (const name of ["Copy install", "Copy AI prompt"]) {
      const button = screen.getByRole("button", { name });
      expect(link.contains(button)).toBe(false);
    }
  });

  it("every section has a captured preview image", () => {
    const missing = SECTIONS.filter((x) => !existsSync(`public/previews/${x.slug}.jpg`)).map((x) => x.slug);
    expect(missing).toEqual([]);
  });
});
