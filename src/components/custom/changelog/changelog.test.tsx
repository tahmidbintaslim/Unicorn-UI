import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Changelog } from "./changelog";

describe("Changelog", () => {
  it("dates use <time datetime>", () => {
    const { container } = render(<Changelog entries={[{ date: "2026-11-03", title: "Heroes", items: ["10 heroes"], version: "0.2.0" }]} />);
    const time = container.querySelector("time");
    expect(time?.getAttribute("datetime")).toBe("2026-11-03");
    expect(time?.textContent).toBe("Nov 3, 2026");
    expect(screen.getByText("v0.2.0")).toBeTruthy();
    expect(screen.getByText("10 heroes")).toBeTruthy();
  });
});
