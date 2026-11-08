import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { CodeBlock } from "./_ui";

it("every code block has a copy button", () => {
  render(<CodeBlock code="const a = 1;" label="usage.tsx" />);
  expect(screen.getByRole("button", { name: "Copy" })).toBeTruthy();
});
