import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FaqTwoColumn } from "./faq-two-column";

describe("FaqTwoColumn", () => {
  it("renders the intro, a contact link and native disclosures", () => {
    const { container } = render(
      <FaqTwoColumn title="Questions" description="Still unsure?" contact={{ label: "Email us", href: "mailto:hi@example.com" }} items={[{ question: "Free?", answer: "Yes." }]} />,
    );
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Questions");
    expect(screen.getByRole("link", { name: "Email us" })).toBeTruthy();
    expect(container.querySelectorAll("details")).toHaveLength(1);
  });
});
