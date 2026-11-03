import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "./contact";

describe("Contact", () => {
  it("every field has a label; form posts to action", () => {
    const { container } = render(<Contact title="Talk to us" action="/api/contact" details={[{ label: "Email", value: "hi@example.com", href: "mailto:hi@example.com" }]} />);
    expect(container.querySelector("form")?.getAttribute("action")).toBe("/api/contact");
    for (const label of ["Name", "Email", "Message"]) expect(screen.getByLabelText(label)).toBeTruthy();
    expect((screen.getByLabelText("Email") as HTMLInputElement).type).toBe("email");
    expect(screen.getByRole("link", { name: "hi@example.com" })).toBeTruthy();
  });
});
