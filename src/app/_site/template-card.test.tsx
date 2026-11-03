import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TemplateCard } from "./template-card";
import { TEMPLATES } from "./templates";

describe("TemplateCard", () => {
  const t = TEMPLATES[0];

  it("shows a lazy, titled live preview of the plain demo", () => {
    const { container } = render(<TemplateCard template={t} />);
    const frame = container.querySelector("iframe");
    expect(frame?.getAttribute("src")).toBe(`/templates/${t.slug}`);
    expect(frame?.getAttribute("loading")).toBe("lazy");
    expect(frame?.getAttribute("title")).toBe(`${t.title} preview`);
    expect(frame?.getAttribute("tabindex")).toBe("-1");
  });

  it("links to the plain and motion demos", () => {
    render(<TemplateCard template={t} />);
    expect(screen.getByRole("link", { name: `View plain ${t.title}` }).getAttribute("href")).toBe(`/templates/${t.slug}`);
    expect(screen.getByRole("link", { name: `View motion ${t.title}` }).getAttribute("href")).toBe(`/templates/${t.slug}/motion`);
  });

  it("uses the heading level it is given", () => {
    render(<TemplateCard template={t} headingLevel="h3" />);
    expect(screen.getByRole("heading", { level: 3, name: t.title })).toBeTruthy();
  });
});
