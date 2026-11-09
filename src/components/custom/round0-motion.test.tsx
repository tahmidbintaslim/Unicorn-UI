import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Zap } from "lucide-react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { BentoGridMotion } from "./bento-grid/bento-grid-motion";
import { CtaBannerMotion } from "./cta-banner/cta-banner-motion";
import { FaqMotion } from "./faq/faq-motion";
import { LogoCloudMotion } from "./logo-cloud/logo-cloud-motion";
import { NavbarMotion } from "./navbar/navbar-motion";

afterEach(() => mockReducedMotion(false));

// The three motion contract tests for each round-0 section: reduced motion
// renders the plain version, server output is visible, and with motion
// allowed the section actually animates.
const cases: [string, () => React.ReactElement, string][] = [
  ["NavbarMotion", () => <NavbarMotion brand="Acme" links={[{ label: "Docs", href: "#docs" }]} />, "Acme"],
  ["LogoCloudMotion", () => <LogoCloudMotion logos={[{ name: "Globex" }, { name: "Initech" }]} />, "Globex"],
  ["BentoGridMotion", () => <BentoGridMotion items={[{ title: "Fast", description: "Quick tiles.", icon: Zap }]} />, "Quick tiles."],
  ["FaqMotion", () => <FaqMotion items={[{ question: "Free?", answer: "Yes, for one project." }]} />, "Free?"],
  ["CtaBannerMotion", () => <CtaBannerMotion title="Start today" actionLabel="Go" actionHref="#go" />, "Start today"],
];

describe.each(cases)("%s", (_, make, text) => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(make());
    expect(animatedElements(container)).toHaveLength(0);
  });

  it("SSR output is visible", () => {
    const html = renderToString(make());
    expect(textOf(html)).toContain(text);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });

  it("animates when motion is allowed", async () => {
    // Motion switches on after mount (one tree from server to client), and the in-view
    // entrances and the scroll-away bar only start once seen or scrolled, so trigger both.
    const io = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = class {
      constructor(private cb: IntersectionObserverCallback) {}
      observe(target: Element) {
        // Async, like a real observer.
        setTimeout(() => this.cb([{ isIntersecting: true, target, intersectionRatio: 1 } as IntersectionObserverEntry], this as never));
      }
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    } as never;
    try {
      const { container } = render(make());
      act(() => {
        Object.defineProperty(window, "scrollY", { configurable: true, value: 300 });
        window.dispatchEvent(new Event("scroll"));
      });
      await waitFor(() => expect(animatedElements(container).length).toBeGreaterThan(0));
    } finally {
      globalThis.IntersectionObserver = io;
      Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    }
  });
});

describe("NavbarMotion", () => {
  it("is sticky so hiding on scroll can bring it back", () => {
    render(<NavbarMotion brand="Acme" links={[]} />);
    expect(screen.getByRole("banner").closest(".sticky")).not.toBeNull();
  });
});

describe("FaqMotion", () => {
  it("keeps native details, so answers open without JavaScript", () => {
    const { container } = render(<FaqMotion items={[{ question: "Free?", answer: "Yes." }]} />);
    const details = container.querySelector("details")!;
    act(() => {
      details.open = true;
      fireEvent(details, new Event("toggle"));
    });
    expect(screen.getByText("Yes.")).toBeTruthy();
  });
});

describe("BentoGridMotion", () => {
  it("accepts an icon element from a server page", () => {
    render(<BentoGridMotion items={[{ title: "Fast", description: "Quick.", icon: <Zap data-testid="el" /> }]} />);
    expect(screen.getByTestId("el")).toBeTruthy();
  });
});
