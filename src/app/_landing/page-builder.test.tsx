import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageBuilder } from "./page-builder";

describe("PageBuilder", () => {
  it("chips are buttons in a labelled group", () => {
    render(<PageBuilder />);
    const group = screen.getByRole("group", { name: "Sections on the example page" });
    const chips = within(group).getAllByRole("button");
    expect(chips.map((c) => c.textContent)).toEqual(["Navbar", "Hero", "Logo cloud", "Features", "Stats", "Testimonials", "Pricing", "FAQ", "CTA", "Footer"]);
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

  it.each([
    ["Features", "Everything in one place"],
    ["Stats", "Acme by the numbers"],
    ["Testimonials", "What teams say"],
  ])("the %s chip adds that section", (name, heading) => {
    render(<PageBuilder />);
    expect(screen.queryByRole("heading", { name: heading })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name }));
    expect(screen.getByRole("heading", { name: heading })).toBeTruthy();
  });

  it("all chips off shows the empty state", async () => {
    render(<PageBuilder />);
    for (const name of ["Navbar", "Hero", "Pricing"]) fireEvent.click(screen.getByRole("button", { name }));
    expect(await screen.findByText("Add a section to start your page.")).toBeTruthy();
  });
});

describe("PageBuilder bundle", () => {
  it("animates with the View Transitions API, so the landing page ships no motion library", async () => {
    const { readFileSync } = await import("node:fs");
    const src = readFileSync("src/app/_landing/page-builder.tsx", "utf8");
    expect(src).not.toContain('"motion/react');
    expect(src).toContain("startViewTransition");
  });
});

describe("PageBuilder imports", () => {
  it("imports plain section files directly; folder barrels re-export motion versions", async () => {
    const { readFileSync } = await import("node:fs");
    const src = readFileSync("src/app/_landing/page-builder.tsx", "utf8");
    expect(src).not.toMatch(/from "@\/components\/custom\/[a-z-]+"/);
  });
});
