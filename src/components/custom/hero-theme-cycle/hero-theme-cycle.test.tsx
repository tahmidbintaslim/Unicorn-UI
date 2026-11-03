import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { HeroThemeCycle } from "./hero-theme-cycle";
import { HeroThemeCycleMotion } from "./hero-theme-cycle-motion";

const props = { title: "Your theme, not ours", accentWord: "theme" };

afterEach(() => vi.useRealTimers());

describe("HeroThemeCycle", () => {
  it("renders heading with the accent word highlighted", () => {
    render(<HeroThemeCycle {...props} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
    expect(screen.getByText("theme").className).toContain("text-primary");
  });
  it("accentWord missing from title renders title unchanged", () => {
    render(<HeroThemeCycle title="Ship today" accentWord="banana" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Ship today");
  });
});
describe("HeroThemeCycleMotion", () => {
  it("cycles to the next theme after interval", () => {
    vi.useFakeTimers();
    const { container } = render(<HeroThemeCycleMotion {...props} interval={1000} />);
    const section = container.querySelector("section")!;
    const first = section.style.getPropertyValue("--primary");
    act(() => vi.advanceTimersByTime(1000));
    expect(section.style.getPropertyValue("--primary")).not.toBe(first);
  });
  it("accent word stays inline so punctuation wraps with it", () => {
    render(<HeroThemeCycleMotion title="Your theme, not ours" accentWord="theme" />);
    expect(screen.getByText("theme").className).not.toContain("inline-block");
  });
  it("empty themes list renders without crashing", () => {
    render(<HeroThemeCycleMotion {...props} themes={[]} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
  });
  it("pressing play resumes cycling even while the button has focus", () => {
    vi.useFakeTimers();
    const { container } = render(<HeroThemeCycleMotion {...props} interval={1000} />);
    const section = container.querySelector("section")!;
    const btn = screen.getByRole("button", { name: "Pause color cycling" });
    fireEvent.focus(btn);
    fireEvent.click(btn); // pause
    fireEvent.click(btn); // play
    const before = section.style.getPropertyValue("--primary");
    act(() => vi.advanceTimersByTime(1000));
    expect(section.style.getPropertyValue("--primary")).not.toBe(before);
  });
  it("pause stops cycling", () => {
    vi.useFakeTimers();
    const { container } = render(<HeroThemeCycleMotion {...props} interval={1000} />);
    const section = container.querySelector("section")!;
    fireEvent.click(screen.getByRole("button", { name: "Pause color cycling" }));
    const before = section.style.getPropertyValue("--primary");
    act(() => vi.advanceTimersByTime(3000));
    expect(section.style.getPropertyValue("--primary")).toBe(before);
  });
  it("accentWord missing from title renders title unchanged", () => {
    render(<HeroThemeCycleMotion title="Ship today" accentWord="banana" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Ship today");
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroThemeCycleMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
    expect(screen.queryByRole("button", { name: "Pause color cycling" })).toBeNull();
  });
  it("SSR output is visible", () => {
    const html = renderToString(<HeroThemeCycleMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
