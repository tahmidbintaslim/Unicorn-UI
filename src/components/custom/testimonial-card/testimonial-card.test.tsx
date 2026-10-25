import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { TestimonialCard } from "./testimonial-card";

describe("TestimonialCard", () => {
  it("uses figure, blockquote and figcaption", () => {
    const { container } = render(
      <TestimonialCard
        testimonial="Sample quote."
        author="Alex Chen"
        role="Frontend developer"
        company="Example Inc"
      />,
    );

    const figure = container.querySelector("figure");
    expect(figure).not.toBeNull();
    expect(figure?.querySelector("blockquote")?.textContent).toContain(
      "Sample quote.",
    );
    expect(figure?.querySelector("figcaption")?.textContent).toContain(
      "Alex Chen",
    );
  });

  it.each([
    [4, "Rated 4 out of 5"],
    [9, "Rated 5 out of 5"],
  ])("labels a rating of %s as one image", (rating, label) => {
    render(
      <TestimonialCard testimonial="Quote" author="Alex Chen" rating={rating} />,
    );
    const stars = screen.getByRole("img", { name: label });
    for (const star of stars.querySelectorAll("svg")) {
      expect(star.getAttribute("aria-hidden")).toBe("true");
    }
  });

  it("treats the avatar as decorative because the name is next to it", () => {
    const { container } = render(
      <TestimonialCard
        testimonial="Quote"
        author="Alex Chen"
        avatar="/demo/avatar.webp"
      />,
    );
    expect(container.querySelector("img")?.getAttribute("alt")).toBe("");
  });

  it("shows role as the job title and does not put it on the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <TestimonialCard
        ref={ref}
        data-testid="root"
        testimonial="Quote"
        author="Alex Chen"
        role="Frontend developer"
      />,
    );

    const root = screen.getByTestId("root");
    expect(ref.current).toBe(root);
    expect(root.hasAttribute("role")).toBe(false);
    expect(screen.getByText("Frontend developer")).toBeTruthy();
  });
});
