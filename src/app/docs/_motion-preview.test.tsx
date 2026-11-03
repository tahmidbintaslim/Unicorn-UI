import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionPreview } from "./_motion-preview";
import { VariantSwitch } from "./_variant-switch";

describe("MotionPreview", () => {
  it("remounts its children when the Motion radio is chosen, so the entrance plays", () => {
    render(
      <div className="variant-scope">
        <VariantSwitch name="variant-x" />
        <MotionPreview>
          <span>child</span>
        </MotionPreview>
      </div>,
    );
    const wrapper = screen.getByText("child").closest("[data-replay]")!;
    const before = wrapper.getAttribute("data-replay");
    act(() => {
      fireEvent.click(screen.getByRole("radio", { name: "Motion" }));
    });
    expect(screen.getByText("child").closest("[data-replay]")!.getAttribute("data-replay")).not.toBe(before);
  });
  it("has a Replay button that remounts the children", () => {
    render(
      <MotionPreview>
        <span>child</span>
      </MotionPreview>,
    );
    const before = screen.getByText("child").closest("[data-replay]")!.getAttribute("data-replay");
    fireEvent.click(screen.getByRole("button", { name: "Replay animation" }));
    expect(screen.getByText("child").closest("[data-replay]")!.getAttribute("data-replay")).not.toBe(before);
  });
});
