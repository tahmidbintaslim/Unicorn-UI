import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CtaBanner } from "./cta-banner";
import { Faq } from "./faq";
import { Hero } from "./hero";

describe("landing blocks", () => {
  it("Hero renders its links only when given, with the title as h1", () => {
    const { rerender } = render(<Hero title="Ship faster" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Ship faster");
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    rerender(
      <Hero title="Ship faster" primaryAction={{ label: "Start", href: "/start" }} />,
    );
    expect(screen.getByRole("link", { name: "Start" }).getAttribute("href")).toBe("/start");
  });

  it("Faq renders every question as a native disclosure and forwards root props", () => {
    const { container } = render(
      <Faq
        data-testid="faq"
        items={[
          { question: "Is it free?", answer: "Yes." },
          { question: "Can I copy it?", answer: "Yes." },
        ]}
      />,
    );
    expect(container.querySelectorAll("details")).toHaveLength(2);
    expect(screen.getByTestId("faq")).toBeTruthy();
  });

  it("CtaBanner links the action", () => {
    render(<CtaBanner title="Ready?" actionLabel="Go" actionHref="/go" />);
    expect(screen.getByRole("link", { name: "Go" }).getAttribute("href")).toBe("/go");
  });
});
