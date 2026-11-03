import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Copy } from "lucide-react";
import { FeatureCard } from "./feature-card/feature-card";
import { InteractiveCard } from "./interactive-card/interactive-card";

// The plain cards' CSS hover lift must respect reduced motion, and must step
// aside inside an active MotionLift so the card doesn't lift twice.
describe.each([
  ["FeatureCard", () => <FeatureCard title="T" description="D" icon={Copy} />],
  ["InteractiveCard", () => <InteractiveCard title="T" description="D" />],
])("%s hover lift", (_, make) => {
  it("only lifts with CSS when motion is allowed, and not inside MotionLift", () => {
    const { container } = render(make());
    const cls = container.querySelector("[data-slot=card]")!.className.split(/\s+/);
    expect(cls).toContain("motion-safe:hover:-translate-y-1");
    expect(cls).not.toContain("hover:-translate-y-1");
    expect(cls).toContain("[[data-motion-lift=on]_&]:hover:translate-y-0");
  });
});
