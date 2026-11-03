import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Playground } from "./playground";
import { PLAYGROUND } from "./playground-data";

const sources = Object.fromEntries(PLAYGROUND.map((p) => [p.slug, { plain: `// ${p.slug} plain source`, motion: `// ${p.slug} motion source` }]));
const usage = () => screen.getByTestId("usage-code").textContent ?? "";

describe("Playground", () => {
  it("changing variant updates the usage code", () => {
    render(<Playground sources={sources} />);
    fireEvent.change(screen.getByLabelText("Hero"), { target: { value: "hero-split" } });
    expect(usage()).toContain("<HeroSplit");
  });
  it("motion toggle switches the import to the motion file", () => {
    render(<Playground sources={sources} />);
    fireEvent.click(screen.getByRole("radio", { name: "Motion" }));
    expect(usage()).toContain('from "@/components/custom/hero/hero-motion"');
    expect(usage()).toContain("<HeroMotion");
  });
  it("density compact appears in the usage className", () => {
    render(<Playground sources={sources} />);
    fireEvent.click(screen.getByRole("radio", { name: "Compact" }));
    expect(usage()).toContain('className="py-10"');
  });
  it("replay disabled for plain", () => {
    render(<Playground sources={sources} />);
    expect((screen.getByRole("button", { name: "Replay animation" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("radio", { name: "Motion" }));
    expect((screen.getByRole("button", { name: "Replay animation" }) as HTMLButtonElement).disabled).toBe(false);
  });
});
