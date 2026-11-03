import { describe, expect, it } from "vitest";
import { SECTIONS, getSection } from "./sections";

describe("sections list", () => {
  it("pairs hero with hero-motion", () => {
    expect(getSection("hero")?.motionSlug).toBe("hero-motion");
  });
  it("hides motion items from SECTIONS", () => {
    expect(SECTIONS.some((s) => s.slug.endsWith("-motion"))).toBe(false);
  });
  it("classifies hero-* as hero", () => {
    expect(getSection("hero")?.kind).toBe("hero");
  });
});
