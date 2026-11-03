import { act } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { expect, it } from "vitest";
import { PricingTableMotion } from "./pricing-table-motion";

const plans = [{ name: "Pro", monthly: 19, yearly: 190, features: ["10 projects"], cta: { label: "Try Pro", href: "/pro" } }];

// The plain radios work before JavaScript loads; a Yearly choice made then
// must survive the switch to the motion version.
it("keeps a period chosen before hydration", async () => {
  const el = <PricingTableMotion plans={plans} />;
  const host = document.createElement("div");
  host.innerHTML = renderToString(el);
  document.body.append(host);
  host.querySelector<HTMLInputElement>('input[data-period-input="yearly"]')!.checked = true;
  await act(async () => {
    hydrateRoot(host, el);
  });
  expect(host.querySelector<HTMLInputElement>('input[data-period-input="yearly"]')!.checked).toBe(true);
  expect(host.textContent).toContain("$190");
  host.remove();
});
