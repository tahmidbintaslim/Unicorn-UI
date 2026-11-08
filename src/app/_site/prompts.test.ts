import { describe, expect, it } from "vitest";
import { aiPrompt, mcpPrompt, REGISTRY_NAMESPACE } from "./prompts";

describe("copy prompts", () => {
  const p = aiPrompt({ slug: "pricing-table", title: "Pricing table", usage: "<PricingTable plans={plans} />" });

  it("AI prompt names the section, the exact install command and the usage", () => {
    expect(p).toContain("Pricing table");
    expect(p).toContain("npx shadcn@latest add https://tapasui.tahmid.space/r/pricing-table.json");
    expect(p).toContain("<PricingTable plans={plans} />");
  });

  it("AI prompt tells the agent to keep theme tokens and replace sample copy", () => {
    expect(p).toMatch(/theme tokens/i);
    expect(p).toMatch(/sample (copy|content)/i);
  });

  it("MCP prompt uses the @tapas namespace and the registry URL template", () => {
    const m = mcpPrompt("hero");
    expect(REGISTRY_NAMESPACE).toBe("@tapas");
    expect(m).toContain("@tapas/hero");
    expect(m).toContain('"@tapas": "https://tapasui.tahmid.space/r/{name}.json"');
  });

  it("without usage, the prompt points to the plain section's docs page", () => {
    const q = aiPrompt({ slug: "faq-motion", title: "FAQ (motion)" });
    expect(q).toContain("https://tapasui.tahmid.space/docs/sections/faq");
    expect(q).not.toContain("faq-motion\nIts");
  });
});
