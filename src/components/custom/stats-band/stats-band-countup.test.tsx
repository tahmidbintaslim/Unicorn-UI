import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Make the band count immediately and record each count-up started.
const animate = vi.fn(() => ({ stop() {} }));
vi.mock("motion/react", async (orig) => ({ ...(await orig<typeof import("motion/react")>()), useInView: () => true, animate }));

const { StatsBandMotion } = await import("./stats-band-motion");

describe("StatsBandMotion count-up", () => {
  it("does not restart when a parent re-renders with equal, fresh stat objects", () => {
    const make = () => [{ value: 120, label: "Sample teams" }];
    const { rerender } = render(<StatsBandMotion stats={make()} />);
    const started = animate.mock.calls.length;
    expect(started).toBeGreaterThan(0);
    rerender(<StatsBandMotion stats={make()} />);
    expect(animate.mock.calls.length).toBe(started);
  });
});
