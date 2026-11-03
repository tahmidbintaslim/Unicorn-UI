import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Team } from "./team";

describe("Team", () => {
  it("lists each person with name, role and labelled links", () => {
    render(<Team title="The team" people={[{ name: "Ana Diaz", role: "Engineer", links: [{ label: "GitHub", href: "https://github.com/ana" }] }]} />);
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe("Ana Diaz");
    expect(screen.getByText("Engineer")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Ana Diaz on GitHub" }).getAttribute("href")).toBe("https://github.com/ana");
  });
  it("renders nothing extra for an empty list", () => {
    const { container } = render(<Team title="x" people={[]} />);
    expect(container.querySelector("ul")).toBeNull();
  });
});
