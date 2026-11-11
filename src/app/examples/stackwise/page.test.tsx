import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams("joined=demo") }));
const { default: StackwiseHome } = await import("./page");
const { default: StackwisePricing } = await import("./pricing/page");

it("renders one h1, the waitlist form posting to its own route, and the status line", () => {
  render(<StackwiseHome />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(document.querySelector("form#join, #join form")?.getAttribute("action")).toBe("/examples/stackwise/api/waitlist");
  expect(document.querySelector('#join input[name="website"]')).toBeTruthy();
  // Other sections have their own live regions, so look for the message text.
  expect(screen.getByText(/Demo mode/)).toBeTruthy();
});

it("pricing has one h1, test checkout links and a free tier that links to the waitlist", () => {
  render(<StackwisePricing />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  const hrefs = [...document.querySelectorAll("a")].map((a) => a.getAttribute("href"));
  expect(hrefs).toContain("/examples/stackwise#join");
  expect(hrefs.some((h) => h?.startsWith("https://buy.stripe.com/test_"))).toBe(true);
});
