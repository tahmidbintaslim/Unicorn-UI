import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import PatchnoteHome from "./page";

it("renders one h1 and the beta form posting to its own route", async () => {
  render(await PatchnoteHome({ searchParams: Promise.resolve({}) }));
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(document.querySelector("form#join, #join form")?.getAttribute("action")).toBe("/examples/patchnote/api/waitlist");
});

it("shows the outcome after a signup and ignores unknown values", async () => {
  const { unmount } = render(await PatchnoteHome({ searchParams: Promise.resolve({ joined: "demo" }) }));
  // Other sections have their own live regions, so look for the message text.
  expect(screen.getByText(/Demo mode/)).toBeTruthy();
  unmount();
  render(await PatchnoteHome({ searchParams: Promise.resolve({ joined: "constructor" }) }));
  expect(screen.queryByText(/Demo mode|on the list|doesn't look right|couldn't add/)).toBeNull();
});
