import { act } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { expect, it } from "vitest";
import { CtaSplitMotion } from "./cta-split-motion";

// Motion reads `initial` only when an element mounts. After hydration the
// media must remount with its entrance state, or it never animates.
it("media gets its entrance state after hydration", async () => {
  const el = <CtaSplitMotion title="Start" primaryAction={{ label: "Go", href: "#" }} media={<span data-testid="m">m</span>} />;
  const host = document.createElement("div");
  host.innerHTML = renderToString(el);
  document.body.append(host);
  await act(async () => {
    hydrateRoot(host, el);
  });
  const wrapper = host.querySelector('[data-testid="m"]')!.parentElement!;
  expect(wrapper.style.opacity || wrapper.style.transform).toBeTruthy();
  host.remove();
});
