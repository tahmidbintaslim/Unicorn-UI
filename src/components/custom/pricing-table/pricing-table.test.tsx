import { fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { PricingTable } from "./pricing-table";
import { PricingTableMotion } from "./pricing-table-motion";

const plans = [
  { name: "Hobby", monthly: 0, yearly: 0, features: ["1 project"], cta: { label: "Start", href: "/start" } },
  { name: "Pro", monthly: 19, yearly: 190, popular: true, features: ["10 projects", "Reports"], cta: { label: "Try Pro", href: "/pro" } },
];

describe("PricingTable", () => {
  it("renders heading and one plan per item", () => {
    render(<PricingTable title="Pricing" plans={plans} />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Pricing");
    expect(screen.getAllByRole("listitem", { name: /Hobby|Pro/ })).toHaveLength(2);
  });
  it("yearly radio exists and monthly is checked by default; both price sets are in the DOM", () => {
    const { container } = render(<PricingTable plans={plans} />);
    expect((screen.getByRole("radio", { name: "Monthly" }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByRole("radio", { name: "Yearly" })).toBeTruthy();
    expect(container.querySelectorAll("[data-period=monthly][data-price]")).toHaveLength(2);
    expect(container.querySelectorAll("[data-period=yearly][data-price]")).toHaveLength(2);
  });
  it("popular plan is marked for screen readers", () => {
    render(<PricingTable plans={plans} />);
    expect(within(screen.getByRole("listitem", { name: "Pro" })).getByText("Most popular")).toBeTruthy();
  });
  it("renders nothing extra for an empty list", () => {
    const { container } = render(<PricingTable title="Pricing" plans={[]} />);
    expect(container.querySelector("ul")).toBeNull();
  });
});

describe("PricingTableMotion", () => {
  it("switching to yearly shows the yearly price", () => {
    render(<PricingTableMotion plans={plans} />);
    fireEvent.click(screen.getByRole("radio", { name: "Yearly" }));
    expect(within(screen.getByRole("listitem", { name: "Pro" })).getByText("$190")).toBeTruthy();
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<PricingTableMotion plans={plans} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<PricingTableMotion title="Pricing" plans={plans} />);
    expect(textOf(html)).toContain("$19");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
