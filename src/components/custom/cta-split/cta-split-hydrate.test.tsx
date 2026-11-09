import { act, waitFor } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { expect, it } from "vitest";
import { CtaSplitMotion } from "./cta-split-motion";

// After hydration the media keeps the server's node (no remount) and still
// gets its entrance once it scrolls into view.
it("media keeps its node and animates in after hydration", async () => {
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
  const el = <CtaSplitMotion title="Start" primaryAction={{ label: "Go", href: "#" }} media={<span data-testid="m">m</span>} />;
  const host = document.createElement("div");
  host.innerHTML = renderToString(el);
  document.body.append(host);
  const media = host.querySelector('[data-testid="m"]')!;
  try {
    await act(async () => {
      hydrateRoot(host, el);
    });
    expect(host.contains(media)).toBe(true);
    const wrapper = media.parentElement!;
    await waitFor(() => expect(wrapper.style.opacity || wrapper.style.transform).toBeTruthy());
  } finally {
    globalThis.IntersectionObserver = io;
    host.remove();
  }
});
