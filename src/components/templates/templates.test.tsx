import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AiTemplate } from "./ai/ai";
import { AiTemplateMotion } from "./ai/ai-motion";
import { ChangelogTemplate } from "./changelog/changelog";
import { ChangelogTemplateMotion } from "./changelog/changelog-motion";
import { MobileAppTemplate } from "./mobile-app/mobile-app";
import { MobileAppTemplateMotion } from "./mobile-app/mobile-app-motion";
import { PricingTemplate } from "./pricing/pricing";
import { PricingTemplateMotion } from "./pricing/pricing-motion";
import { SaasTemplate } from "./saas/saas";
import { SaasTemplateMotion } from "./saas/saas-motion";
import { WaitlistTemplate } from "./waitlist/waitlist";
import { WaitlistTemplateMotion } from "./waitlist/waitlist-motion";

const cases = [
  ["saas", SaasTemplate, SaasTemplateMotion],
  ["waitlist", WaitlistTemplate, WaitlistTemplateMotion],
  ["ai", AiTemplate, AiTemplateMotion],
  ["pricing", PricingTemplate, PricingTemplateMotion],
  ["changelog", ChangelogTemplate, ChangelogTemplateMotion],
  ["mobile-app", MobileAppTemplate, MobileAppTemplateMotion],
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
  it("mobile-app motion uses the drifting testimonials wall, plain does not", () => {
    const { unmount } = render(<MobileAppTemplateMotion />);
    expect(screen.getByRole("button", { name: "Pause scrolling" })).toBeTruthy();
    unmount();
    render(<MobileAppTemplate />);
    expect(screen.queryByRole("button", { name: "Pause scrolling" })).toBeNull();
  });
  it("pricing and changelog render their key sections", () => {
    render(<PricingTemplate />);
    expect(screen.getByRole("table", { name: /plans compared/ })).toBeTruthy();
    render(<ChangelogTemplate />);
    expect(screen.getByRole("heading", { level: 2, name: "Recent releases" })).toBeTruthy();
  });
});

describe("template sample content", () => {
  it("labels made-up logo and customer names as samples", async () => {
    const { saasContent } = await import("./saas/content");
    expect(saasContent.logos.title.toLowerCase()).toContain("sample");
  });
  it("labels new templates' quotes, posts and prices as samples", async () => {
    const { mobileAppContent } = await import("./mobile-app/content");
    const { changelogContent } = await import("./changelog/content");
    const { pricingContent } = await import("./pricing/content");
    expect(mobileAppContent.testimonials.description.toLowerCase()).toContain("sample");
    expect(changelogContent.blog.description.toLowerCase()).toContain("sample");
    expect(pricingContent.pricing.description.toLowerCase()).toContain("sample");
  });
});
