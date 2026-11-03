import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import registry from "../../../registry.json";
import { SECTIONS } from "./sections";
import { TEMPLATES } from "./templates";

const names = new Set(registry.items.map((i) => i.name));

describe("templates", () => {
  it("keeps templates out of the section catalogue", () => {
    expect(SECTIONS.some((s) => s.slug.startsWith("template-"))).toBe(false);
  });

  it("lists every template registry item", () => {
    const plain = registry.items.filter((i) => i.name.startsWith("template-") && !i.name.endsWith("-motion"));
    expect(TEMPLATES.map((t) => t.registry).sort()).toEqual(plain.map((i) => i.name).sort());
  });

  it.each(TEMPLATES.map((t) => [t.slug, t] as const))("%s has a motion item and plain + motion demo routes", (slug, t) => {
    expect(names.has(`${t.registry}-motion`)).toBe(true);
    expect(existsSync(`src/app/templates/${slug}/page.tsx`)).toBe(true);
    expect(existsSync(`src/app/templates/${slug}/motion/page.tsx`)).toBe(true);
  });
});
