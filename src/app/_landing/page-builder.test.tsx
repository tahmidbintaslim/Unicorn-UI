import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageBuilder } from "./page-builder";

describe("PageBuilder", () => {
  it("chips are buttons in a labelled group", () => {
    render(<PageBuilder />);
    const group = screen.getByRole("group", { name: "Sections on the example page" });
    const chips = within(group).getAllByRole("button");
    expect(chips.map((c) => c.textContent)).toEqual(["Navbar", "Hero", "Logo cloud", "Pricing", "FAQ", "CTA", "Footer"]);
    expect(chips.filter((c) => c.getAttribute("aria-pressed") === "true").map((c) => c.textContent)).toEqual([
      "Navbar",
      "Hero",
      "Pricing",
    ]);
  });

  it("toggling a chip adds and removes its section", async () => {
    render(<PageBuilder />);
    const faq = screen.getByRole("button", { name: "FAQ" });
    expect(screen.queryByText("Frequently asked questions")).toBeNull();
    fireEvent.click(faq);
    expect(faq.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("Frequently asked questions")).toBeTruthy();
    fireEvent.click(faq);
    expect(faq.getAttribute("aria-pressed")).toBe("false");
    await waitFor(() => expect(screen.queryByText("Frequently asked questions")).toBeNull());
  });

  it("all chips off shows the empty state", async () => {
    render(<PageBuilder />);
    for (const name of ["Navbar", "Hero", "Pricing"]) fireEvent.click(screen.getByRole("button", { name }));
    expect(await screen.findByText("Add a section to start your page.")).toBeTruthy();
  });
});
