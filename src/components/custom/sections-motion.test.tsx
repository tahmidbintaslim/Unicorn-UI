import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { AnnouncementBarMotion } from "./announcement-bar/announcement-bar-motion";
import { ChangelogMotion } from "./changelog/changelog-motion";
import { ComingSoonMotion } from "./coming-soon/coming-soon-motion";
import { ComparisonTableMotion } from "./comparison-table/comparison-table-motion";
import { FaqTwoColumnMotion } from "./faq-two-column/faq-two-column-motion";
import { TeamMotion } from "./team/team-motion";

afterEach(() => mockReducedMotion(false));

// The motion contract for each section: reduced motion renders the plain
// layout, server output is visible, and with motion allowed it animates.
const cases: [string, () => React.ReactElement, string][] = [
  ["AnnouncementBarMotion", () => <AnnouncementBarMotion message="New sections" link={{ label: "See", href: "#s" }} />, "New sections"],
  ["ChangelogMotion", () => <ChangelogMotion entries={[{ date: "2026-11-03", title: "Sample release", items: ["Sample item"] }]} />, "Sample release"],
  ["ComingSoonMotion", () => <ComingSoonMotion title="Sample launch" action="#n" launchDate="2026-12-01" />, "Sample launch"],
  ["ComparisonTableMotion", () => <ComparisonTableMotion caption="Plans" plans={["Free", "Pro"]} rows={[{ feature: "Reports", values: [false, true] }]} />, "Reports"],
  ["FaqTwoColumnMotion", () => <FaqTwoColumnMotion items={[{ question: "Free?", answer: "Yes." }]} />, "Free?"],
  ["TeamMotion", () => <TeamMotion people={[{ name: "Ana Diaz", role: "Founder (fictional)" }]} />, "Ana Diaz"],
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
    const io = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = class {
      constructor(private cb: IntersectionObserverCallback) {}
      observe(target: Element) {
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
      // FAQ answers only move when opened.
      const details = container.querySelector("details");
      if (details) {
        act(() => {
          details.open = true;
          fireEvent(details, new Event("toggle"));
        });
      }
      await waitFor(() => expect(animatedElements(container).length).toBeGreaterThan(0));
    } finally {
      globalThis.IntersectionObserver = io;
    }
  });
});

describe("FaqTwoColumnMotion", () => {
  it("keeps native details, so answers open without JavaScript", () => {
    const { container } = render(<FaqTwoColumnMotion items={[{ question: "Free?", answer: "Yes." }]} />);
    expect(container.querySelector("details summary")).not.toBeNull();
    expect(screen.getByText("Yes.")).toBeTruthy();
  });
});

describe("ComparisonTableMotion", () => {
  it("keeps the table semantics", () => {
    render(<ComparisonTableMotion caption="Plans" plans={["Free"]} rows={[{ feature: "Reports", values: [true] }]} />);
    expect(screen.getByRole("table", { name: "Plans" })).toBeTruthy();
    expect(screen.getByRole("rowheader", { name: "Reports" })).toBeTruthy();
    expect(screen.getByText("Included")).toBeTruthy();
  });
});
