import { render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

let query = "";
vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams(query) }));
const { StatusLine } = await import("./status-line");

afterEach(() => (query = ""));

it("shows the waitlist outcome from ?joined=", () => {
  query = "joined=demo";
  render(<StatusLine />);
  expect(screen.getByRole("status").textContent).toMatch(/Demo mode/);
});

it("shows the test checkout message", () => {
  query = "checkout=success";
  render(<StatusLine />);
  expect(screen.getByRole("status").textContent).toMatch(/Nothing was charged/);
});

it("ignores unknown values, including built-in object keys", () => {
  for (const joined of ["constructor", "toString", "nope"]) {
    query = `joined=${joined}`;
    const { unmount } = render(<StatusLine />);
    expect(screen.queryByRole("status")).toBeNull();
    unmount();
  }
});
