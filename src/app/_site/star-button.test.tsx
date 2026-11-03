import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StarButton } from "./star-button";

describe("StarButton", () => {
  it("without count shows no number", () => {
    render(<StarButton count={null} />);
    const link = screen.getByRole("link", { name: /Star on GitHub/ });
    expect(link.textContent).not.toMatch(/\d/);
  });
  it("with count shows the formatted number", () => {
    render(<StarButton count={1234} />);
    expect(screen.getByRole("link", { name: /Star on GitHub/ }).textContent).toContain("1,234");
  });
});

describe("StarButton bundle", () => {
  it("pops a new count with CSS, not the motion library", async () => {
    const { readFileSync } = await import("node:fs");
    expect(readFileSync("src/app/_site/star-button.tsx", "utf8")).not.toContain('"motion/react"');
  });
});
