import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { LaunchDemo } from "./launch-demo";

it("walks through what the waitlist does and says nothing was stored", () => {
  render(<LaunchDemo checkoutHref="https://buy.stripe.com/test_x" />);
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "ana@example.com" } });
  fireEvent.submit(screen.getByLabelText("Email address").closest("form")!);
  const status = screen.getByRole("status");
  expect(status.textContent).toMatch(/Email checked/);
  expect(status.textContent).toMatch(/Spam trap passed/);
  expect(status.textContent).toMatch(/nothing was stored/i);
});

it("rejects a bad email with a clear message", () => {
  render(<LaunchDemo checkoutHref="https://buy.stripe.com/test_x" />);
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "nope" } });
  fireEvent.submit(screen.getByLabelText("Email address").closest("form")!);
  expect(screen.getByRole("status").textContent).toMatch(/doesn't look right/);
});

it("links to the Stripe test checkout", () => {
  render(<LaunchDemo checkoutHref="https://buy.stripe.com/test_x" />);
  expect(screen.getByRole("link", { name: /test checkout/i }).getAttribute("href")).toBe("https://buy.stripe.com/test_x");
});
