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

describe("docs coverage", () => {
  it("every section has a docs entry", async () => {
    const { DOCS } = await import("../docs/_content");
    const missing = SECTIONS.filter((s) => !DOCS[s.slug]).map((s) => s.slug);
    expect(missing).toEqual([]);
  });
  it("every section belongs to a named group", async () => {
    const { GROUPS } = await import("./sections");
    const names = GROUPS.map((g) => g.name);
    for (const s of SECTIONS) expect(names).toContain(s.group);
  });
  it("groups appear in a fixed order with heroes first", async () => {
    const { GROUPS } = await import("./sections");
    expect(GROUPS.map((g) => g.name)).toEqual(["Heroes", "Marketing", "Proof", "Features", "Company", "Navigation & utility", "Cards"]);
  });
});

describe("docs import lines", () => {
  it("each section's import line is one import of that section", async () => {
    const { DOCS } = await import("../docs/_content");
    for (const s of SECTIONS) {
      const doc = DOCS[s.slug];
      for (const line of [doc.importLine, doc.motion?.importLine].filter(Boolean) as string[]) {
        expect(line.split("\n"), `${s.slug}: ${line}`).toHaveLength(1);
        expect(line, s.slug).toContain(`@/components/custom/${s.slug}`);
      }
    }
  });
});
