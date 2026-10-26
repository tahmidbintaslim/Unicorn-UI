import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

// The live demo once pointed images at /api/placeholder/..., a route that never
// existed, so both images were broken in production. Every local image path the
// demo pages pass to a card must be a real file in public/.
const appDir = join(process.cwd(), "src", "app");
const publicDir = join(process.cwd(), "public");
const imageProp = /\b(?:src|image|avatar|authorAvatar)=\{?["'](\/[^"']*)["']/g;

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) && !entry.name.includes(".test.")
      ? [path]
      : [];
  });
}

const references = sourceFiles(appDir).flatMap((file) =>
  [...readFileSync(file, "utf8").matchAll(imageProp)].map((match) => ({
    file: relative(process.cwd(), file),
    path: match[1],
  })),
);

describe("demo image paths", () => {
  it("finds the sample images the home page uses", () => {
    expect(references.map((ref) => ref.path)).toEqual(
      expect.arrayContaining(["/demo/avatar.webp", "/demo/blog-cover.webp"]),
    );
  });

  it.each(references.map((ref) => [ref.path, ref.file]))(
    "%s (in %s) is a file in public/",
    (path) => {
      expect(existsSync(join(publicDir, path))).toBe(true);
    },
  );
});
