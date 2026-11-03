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
    expect(screen.getByLabelText("1,234 stars").textContent).toBe("1,234");
  });
});
