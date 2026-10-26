import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatisticsCard } from "./statistics-card";

function trendText(container: HTMLElement) {
  return container.querySelector("p")?.textContent ?? null;
}

describe("StatisticsCard", () => {
  it("formats numbers the same way on the server and in every browser", () => {
    render(<StatisticsCard title="Total revenue" value={45231} prefix="$" />);
    expect(screen.getByText("$45,231")).toBeTruthy();
  });

  it.each([
    [20.1, "Up+20.1% from last month"],
    [-4, "Down-4% from last month"],
    [0, "No change0% from last month"],
  ])("announces a change of %s in words, not only by color", (change, text) => {
    const { container } = render(
      <StatisticsCard title="Revenue" value={1} change={change} />,
    );
    expect(trendText(container)).toBe(text);
    const icon = container.querySelector("p svg");
    expect(icon?.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders no trend line when there is no change value", () => {
    const { container } = render(<StatisticsCard title="Revenue" value={1} />);
    expect(trendText(container)).toBeNull();
  });
});
