import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists docs pages and leaves out the fictional demos", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("https://tapasui.tahmid.space/docs/sections/faq");
    expect(urls.some((u) => u.includes("/examples/"))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
