import { render, screen, within } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { PricingCard } from "./pricing-card";

const features = [
  { text: "Unlimited projects", included: true },
  { text: "Custom integrations", included: false },
];

describe("PricingCard", () => {
  it("renders features as a list and says whether each one is included", () => {
    render(<PricingCard name="Pro" price={29} features={features} />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items.map((item) => item.textContent)).toEqual([
      "Included: Unlimited projects",
      "Not included: Custom integrations",
    ]);
    for (const icon of list.querySelectorAll("svg")) {
      expect(icon.getAttribute("aria-hidden")).toBe("true");
    }
  });

  it("describes the call to action with the plan name and calls onSelect", () => {
    const onSelect = vi.fn();
    render(
      <PricingCard
        name="Pro"
        price={29}
        features={features}
        ctaText="Start free trial"
        onSelect={onSelect}
      />,
    );

    const button = screen.getByRole("button", { name: "Start free trial" });
    const describedBy = button.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)?.textContent).toBe("Pro");

    button.click();
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("forwards ref and root props", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <PricingCard
        ref={ref}
        id="pro-plan"
        data-testid="root"
        aria-label="Pro plan"
        name="Pro"
        price={29}
        features={features}
      />,
    );

    const root = screen.getByTestId("root");
    expect(ref.current).toBe(root);
    expect(root.id).toBe("pro-plan");
    expect(root.getAttribute("aria-label")).toBe("Pro plan");
  });
});
