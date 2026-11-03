import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import registry from "../registry.json";

// Packages a registry file imports must be in that item's dependencies;
// react, next and path aliases come with the user's project.
const PROVIDED = /^(react|react-dom|next)(\/|$)/;

describe("registry dependencies", () => {
  it.each(registry.items.map((i) => [i.name, i] as const))("%s declares every package it imports", (_, item) => {
    const declared = new Set(("dependencies" in item ? item.dependencies : []) ?? []);
    for (const file of item.files) {
      const src = readFileSync(file.path, "utf8");
      for (const [, pkg] of src.matchAll(/from "([^".@/][^"]*|@[^"/]+\/[^"/]+)[^"]*"/g)) {
        const name = pkg.startsWith("@") ? pkg : pkg.split("/")[0];
        if (PROVIDED.test(name) || pkg.startsWith("@/")) continue;
        expect(declared, `${file.path} imports ${name}`).toContain(name);
      }
    }
  });
});
