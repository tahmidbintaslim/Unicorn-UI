import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ComingSoon } from "./coming-soon";

describe("ComingSoon", () => {
  it("renders an h1, a labelled signup form and the launch date when given", () => {
    const { container } = render(<ComingSoon title="Something new" action="/notify" launchDate="2026-12-01" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Something new");
    expect(container.querySelector("form")?.getAttribute("action")).toBe("/notify");
    expect(screen.getByLabelText("Email address")).toBeTruthy();
    expect(container.querySelector("time")?.getAttribute("datetime")).toBe("2026-12-01");
  });
});
