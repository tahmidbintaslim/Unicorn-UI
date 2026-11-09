import { fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { mockReducedMotion, textOf } from "@/test/motion";
import { HeroShader } from "./hero-shader";
import { HeroShaderMotion } from "./hero-shader-motion";

const props = { title: "Light on water", description: "A flowing gradient.", primaryAction: { label: "Start", href: "/start" } };
afterEach(() => mockReducedMotion(false));

describe("HeroShader", () => {
  it("renders heading, description and actions over a decorative backdrop", () => {
    const { container } = render(<HeroShader {...props} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
    expect(screen.getByRole("link", { name: "Start" })).toBeTruthy();
    expect(container.querySelector('[data-slot="shader-backdrop"]')?.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("HeroShaderMotion", () => {
  it("server output has the text and no canvas", () => {
    const html = renderToString(<HeroShaderMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(html).not.toContain("<canvas");
  });
  it("reduced motion renders no canvas and no pause button", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroShaderMotion {...props} />);
    expect(container.querySelector("canvas")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });
  it("has a pause button that toggles", () => {
    const { container } = render(<HeroShaderMotion {...props} />);
    expect(container.querySelector('canvas[aria-hidden="true"]')).toBeTruthy();
    const button = screen.getByRole("button", { name: "Pause background" });
    fireEvent.click(button);
    expect(screen.getByRole("button", { name: "Play background" }).getAttribute("aria-pressed")).toBe("true");
  });
  it("titleAs h2 keeps the page's single h1 elsewhere", () => {
    render(<HeroShaderMotion {...props} titleAs="h2" />);
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
  });
});
