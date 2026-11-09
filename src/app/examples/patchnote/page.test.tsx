import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams("joined=demo") }));
const { default: PatchnoteHome } = await import("./page");

it("renders one h1, the beta form posting to its own route, and the status line", () => {
  render(<PatchnoteHome />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(document.querySelector("form#join, #join form")?.getAttribute("action")).toBe("/examples/patchnote/api/waitlist");
  // Other sections have their own live regions, so look for the message text.
  expect(screen.getByText(/Demo mode/)).toBeTruthy();
});
