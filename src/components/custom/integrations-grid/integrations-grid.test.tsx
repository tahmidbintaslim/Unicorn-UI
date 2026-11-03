import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { IntegrationsGrid } from "./integrations-grid";
import { IntegrationsGridMotion } from "./integrations-grid-motion";

const items = [
  { name: "Stripe", description: "Payments", href: "/i/stripe" },
  { name: "Slack", description: "Alerts" },
];

describe("IntegrationsGrid", () => {
  it("links tiles that have an href and names every tile", () => {
    render(<IntegrationsGrid title="Integrations" items={items} />);
    expect(screen.getByRole("link", { name: /Stripe/ }).getAttribute("href")).toBe("/i/stripe");
    expect(screen.getByText("Slack")).toBeTruthy();
    expect(screen.queryByRole("link", { name: /Slack/ })).toBeNull();
  });
});
describe("IntegrationsGridMotion", () => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<IntegrationsGridMotion items={items} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<IntegrationsGridMotion items={items} />);
    expect(textOf(html)).toContain("Payments");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
