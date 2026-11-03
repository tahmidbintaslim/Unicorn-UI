import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AiTemplate } from "./ai/ai";
import { AiTemplateMotion } from "./ai/ai-motion";
import { SaasTemplate } from "./saas/saas";
import { SaasTemplateMotion } from "./saas/saas-motion";
import { WaitlistTemplate } from "./waitlist/waitlist";
import { WaitlistTemplateMotion } from "./waitlist/waitlist-motion";

const cases = [
  ["saas", SaasTemplate, SaasTemplateMotion],
  ["waitlist", WaitlistTemplate, WaitlistTemplateMotion],
  ["ai", AiTemplate, AiTemplateMotion],
] as const;

describe.each(cases)("%s template", (_, Plain, Motion) => {
  it("renders exactly one h1", () => {
    render(<Plain />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
  it("motion version also renders exactly one h1", () => {
    render(<Motion />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
  it("content prop overrides copy", () => {
    render(<Plain content={{ hero: { title: "My own headline" } }} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("My own headline");
  });
  it("has a main landmark", () => {
    render(<Plain />);
    expect(screen.getByRole("main")).toBeTruthy();
  });
});

describe("motion flag swaps in motion sections", () => {
  it("saas motion uses the drifting testimonials wall", () => {
    render(<SaasTemplateMotion />);
    expect(screen.getByRole("button", { name: "Pause scrolling" })).toBeTruthy();
  });
  it("saas plain has no motion-only controls", () => {
    render(<SaasTemplate />);
    expect(screen.queryByRole("button", { name: "Pause scrolling" })).toBeNull();
  });
});

describe("template sample content", () => {
  it("labels made-up logo and customer names as samples", async () => {
    const { saasContent } = await import("./saas/content");
    expect(saasContent.logos.title.toLowerCase()).toContain("sample");
  });
});
