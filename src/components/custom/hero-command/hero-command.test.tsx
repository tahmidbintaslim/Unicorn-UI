import { fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { HeroCommand } from "./hero-command";
import { HeroCommandMotion } from "./hero-command-motion";

const props = {
  title: "Install a section in one line",
  description: "Then make it yours.",
  command: "npx shadcn@latest add https://example.com/r/hero.json",
  primaryAction: { label: "Read the docs", href: "/docs" },
};

describe("HeroCommand", () => {
  it("renders heading, description and actions", () => {
    render(<HeroCommand {...props} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
    expect(screen.getByRole("link", { name: "Read the docs" })).toBeTruthy();
    expect(screen.getByText(props.command)).toBeTruthy();
  });
  it("copy button writes the command to the clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<HeroCommand {...props} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy command" }));
    expect(writeText).toHaveBeenCalledWith(props.command);
    expect(await screen.findByText("Copied")).toBeTruthy();
  });
});

describe("HeroCommandMotion", () => {
  it("screen readers get the full command immediately", () => {
    render(<HeroCommandMotion {...props} />);
    expect(screen.getByText(props.command, { selector: ".sr-only" })).toBeTruthy();
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroCommandMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
    expect(screen.getByText(props.command, { selector: ".sr-only" })).toBeTruthy();
  });
  it("SSR output is visible", () => {
    const html = renderToString(<HeroCommandMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(textOf(html)).toContain(props.command);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
