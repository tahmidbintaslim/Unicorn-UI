import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnnouncementBar } from "./announcement-bar";

describe("AnnouncementBar", () => {
  it("shows the message and link", () => {
    render(<AnnouncementBar message="New: 44 sections" link={{ label: "See what's new", href: "/changelog" }} />);
    expect(screen.getByText("New: 44 sections")).toBeTruthy();
    expect(screen.getByRole("link", { name: "See what's new" })).toBeTruthy();
  });
  it('close button hides it and is labelled "Dismiss announcement"', () => {
    const { container } = render(<AnnouncementBar message="Hello" dismissible />);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss announcement" }));
    expect(container.querySelector('[data-slot="announcement"]')).toBeNull();
  });
});
