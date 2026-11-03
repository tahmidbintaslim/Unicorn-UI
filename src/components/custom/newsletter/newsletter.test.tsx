import { fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { Newsletter } from "./newsletter";
import { NewsletterMotion } from "./newsletter-motion";

const props = { title: "Get the newsletter", action: "/subscribe" };

describe("Newsletter", () => {
  it("renders an h2 and a native form with a labelled email field", () => {
    const { container } = render(<Newsletter {...props} />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(props.title);
    expect(container.querySelector("form")?.getAttribute("action")).toBe("/subscribe");
    expect((screen.getByLabelText("Email address") as HTMLInputElement).required).toBe(true);
  });
});
describe("NewsletterMotion", () => {
  it("shows a success message after onSubmit resolves", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<NewsletterMotion {...props} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "a@b.co" } });
    fireEvent.submit(screen.getByLabelText("Email address").closest("form")!);
    expect(onSubmit).toHaveBeenCalledWith("a@b.co");
    expect(await screen.findByText("Thanks, you're subscribed.")).toBeTruthy();
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<NewsletterMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<NewsletterMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
