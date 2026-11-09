import { fireEvent, render } from "@testing-library/react";
import { expect, it, vi } from "vitest";

let path = "/a";
vi.mock("next/navigation", () => ({ usePathname: () => path }));
const { MenuCloser } = await import("./menu-closer");

const menu = () => (
  <>
    <details data-menu open>
      <summary>Menu</summary>
      <a href="#x">Link</a>
    </details>
    <p>outside</p>
  </>
);

it("closes an open menu on Escape and returns focus to its button", () => {
  const { container } = render(<>{menu()}<MenuCloser /></>);
  const details = container.querySelector("details")!;
  container.querySelector("a")!.focus();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(details.open).toBe(false);
  expect(document.activeElement).toBe(container.querySelector("summary"));
});

it("closes on a click outside, not inside", () => {
  const { container } = render(<>{menu()}<MenuCloser /></>);
  const details = container.querySelector("details")!;
  fireEvent.click(container.querySelector("a")!);
  expect(details.open).toBe(true);
  fireEvent.click(container.querySelector("p")!);
  expect(details.open).toBe(false);
});

it("closes when the route changes", () => {
  const { container, rerender } = render(<>{menu()}<MenuCloser /></>);
  path = "/b";
  rerender(<>{menu()}<MenuCloser /></>);
  expect(container.querySelector("details")!.open).toBe(false);
});
