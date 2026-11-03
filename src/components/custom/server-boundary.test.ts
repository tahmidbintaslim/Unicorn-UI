import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// src/components/ui/button.tsx is a client module (Radix Slot needs one), so a
// server component that calls buttonVariants() crashes at render time in Next.
// jsdom tests can't see that boundary, so check the source instead.
const root = "src/components/custom";
const files = readdirSync(root, { recursive: true, encoding: "utf8" })
  .filter((f) => f.endsWith(".tsx") && !f.includes(".test.") && !f.includes(".stories."))
  .map((f) => join(root, f));

describe("server/client boundary", () => {
  it.each(files.filter((f) => !readFileSync(f, "utf8").startsWith('"use client"')))("%s does not call buttonVariants()", (f) => {
    expect(readFileSync(f, "utf8")).not.toMatch(/buttonVariants\(/);
  });
});
