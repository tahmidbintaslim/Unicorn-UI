import { fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { HeroWaitlist } from "./hero-waitlist";
import { HeroWaitlistMotion } from "./hero-waitlist-motion";

const props = { title: "Be first in line", description: "We'll email you once.", action: "/api/waitlist" };

describe("HeroWaitlist", () => {
  it("renders heading, description and a native form", () => {
    const { container } = render(<HeroWaitlist {...props} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
    const form = container.querySelector("form");
    expect(form?.getAttribute("action")).toBe("/api/waitlist");
    expect(form?.getAttribute("method")).toBe("post");
    expect(screen.getByRole("button", { name: "Join the waitlist" })).toBeTruthy();
  });
  it("input has an accessible label", () => {
    render(<HeroWaitlist {...props} />);
    const input = screen.getByLabelText("Email address") as HTMLInputElement;
    expect(input.type).toBe("email");
    expect(input.required).toBe(true);
  });
});
describe("HeroWaitlistMotion", () => {
  it("success message after onSubmit resolves", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<HeroWaitlistMotion {...props} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "sam@example.com" } });
    fireEvent.submit(screen.getByRole("button", { name: "Join the waitlist" }).closest("form")!);
    expect(onSubmit).toHaveBeenCalledWith("sam@example.com");
    expect(await screen.findByText("You're on the list.")).toBeTruthy();
  });
  it("error message after onSubmit rejects", async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error("nope"));
    render(<HeroWaitlistMotion {...props} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "sam@example.com" } });
    fireEvent.submit(screen.getByRole("button", { name: "Join the waitlist" }).closest("form")!);
    expect((await screen.findByRole("alert")).textContent).toBe("Something went wrong. Try again.");
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroWaitlistMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<HeroWaitlistMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});

describe("HeroWaitlist honeypot", () => {
  it("renders a hidden, unlabelled-to-humans field when honeypotName is set", () => {
    const { container } = render(<HeroWaitlist title="T" action="/w" honeypotName="website" />);
    const trap = container.querySelector<HTMLInputElement>('input[name="website"]')!;
    expect(trap).not.toBeNull();
    expect(trap.tabIndex).toBe(-1);
    expect(trap.autocomplete).toBe("off");
    expect(trap.closest("[aria-hidden=true]")).not.toBeNull();
  });
});
