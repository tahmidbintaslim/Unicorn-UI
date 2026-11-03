import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FooterSimple } from "./footer-simple";

describe("FooterSimple", () => {
  it("renders brand, a labelled footer nav and small print", () => {
    render(<FooterSimple brand="Acme" note="© Acme" links={[{ label: "Privacy", href: "/privacy" }]} />);
    expect(screen.getByRole("contentinfo")).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Footer" }).textContent).toContain("Privacy");
    expect(screen.getByText("© Acme")).toBeTruthy();
  });
});
