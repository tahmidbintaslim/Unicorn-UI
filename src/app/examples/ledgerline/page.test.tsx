import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams("joined=demo") }));
const { default: LedgerlineHome } = await import("./page");

it("renders one h1, the form posting to its own route, and the status line", () => {
  render(<LedgerlineHome />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(document.querySelector("#join form, form#join")?.getAttribute("action")).toBe("/examples/ledgerline/api/waitlist");
  expect(screen.getByText(/Demo mode/)).toBeTruthy();
});
