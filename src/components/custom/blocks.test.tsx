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

import { Footer } from "./footer";
import { LogoCloud } from "./logo-cloud";

describe("logo cloud and footer", () => {
  it("LogoCloud lists names and keeps the name readable behind a logo", () => {
    render(
      <LogoCloud
        logos={[{ name: "Acme" }, { name: "Globex", logo: <svg data-testid="g" /> }]}
      />,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Acme")).toBeTruthy();
    expect(screen.getByText("Globex").className).toContain("sr-only");
  });

  it("Footer renders columns inside a labelled nav", () => {
    render(
      <Footer
        brand="Tapas"
        note="MIT"
        columns={[{ title: "Product", links: [{ label: "Blocks", href: "/blocks" }] }]}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Blocks" }).getAttribute("href")).toBe("/blocks");
    expect(screen.getByRole("contentinfo")).toBeTruthy();
  });
});

import { Zap } from "lucide-react";
import { BentoGrid } from "./bento-grid";
import { Navbar } from "./navbar";

describe("navbar and bento grid", () => {
  it("Navbar renders a labelled main nav, every link twice (desktop and mobile) and the action", () => {
    render(
      <Navbar
        brand="Tapas"
        links={[{ label: "Blocks", href: "/blocks" }]}
        action={{ label: "Get started", href: "/start" }}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Main" })).toBeTruthy();
    expect(screen.getAllByRole("link", { name: "Blocks" })).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Get started" }).getAttribute("href")).toBe("/start");
    expect(screen.getByText("Menu").className).toContain("sr-only");
  });

  it("BentoGrid renders tiles as list items, applies spans and hides icons", () => {
    const { container } = render(
      <BentoGrid
        title="Features"
        items={[
          { title: "Fast", description: "Ships quickly", icon: Zap, size: "large" },
          { title: "Small", description: "Tiny" },
        ]}
      />,
    );
    const tiles = screen.getAllByRole("listitem");
    expect(tiles).toHaveLength(2);
    expect(tiles[0].className).toContain("md:col-span-2");
    expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
  });
});
