import { act } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import { mockReducedMotion } from "@/test/motion";
import { NewsletterMotion } from "./newsletter-motion";

afterEach(() => mockReducedMotion(false));

// The server can't know the reduced-motion setting, so the first client
// render must match the server's markup whatever the setting is.
it.each([false, true])("hydrates without a mismatch (reduced motion: %s)", async (reduced) => {
  mockReducedMotion(reduced);
  const el = <NewsletterMotion title="News" action="/subscribe" />;
  const host = document.createElement("div");
  host.innerHTML = renderToString(el);
  document.body.append(host);
  const errors = vi.spyOn(console, "error").mockImplementation(() => {});
  await act(async () => {
    hydrateRoot(host, el, { onRecoverableError: (e) => console.error(e) });
  });
  expect(errors).not.toHaveBeenCalled();
  errors.mockRestore();
  host.remove();
});
