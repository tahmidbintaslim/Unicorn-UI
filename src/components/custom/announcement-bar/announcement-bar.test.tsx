import { fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
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
    expect(container.querySelector<HTMLElement>('[data-slot="announcement"]')!.hidden).toBe(true);
  });
  it("is a server component; only the close button ships JavaScript", () => {
    const src = readFileSync("src/components/custom/announcement-bar/announcement-bar.tsx", "utf8");
    expect(src.startsWith('"use client"')).toBe(false);
  });
});
