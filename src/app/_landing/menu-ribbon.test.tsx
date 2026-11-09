import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { MenuRibbon } from "./menu-ribbon";

const items = [{ slug: "faq", title: "FAQ" }, { slug: "hero", title: "Hero" }];

it("links each section once for keyboard and screen readers, with a working pause button", () => {
  render(<MenuRibbon items={items} />);
  // The looping copy is hidden from assistive tech and the tab order.
  expect(screen.getAllByRole("link", { name: "FAQ" })).toHaveLength(1);
  const button = screen.getByRole("button", { name: "Pause section ribbon" });
  fireEvent.click(button);
  expect(screen.getByRole("button", { name: "Play section ribbon" }).getAttribute("aria-pressed")).toBe("true");
});
