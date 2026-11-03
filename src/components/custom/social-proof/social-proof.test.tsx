import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { SocialProof } from "./social-proof";
import { SocialProofMotion } from "./social-proof-motion";

const props = { text: "Used by 300 indie teams (sample)", people: [{ name: "Ana" }, { name: "Ben" }, { name: "Cy" }], rating: 4.8 };

describe("SocialProof", () => {
  it("shows the line, initials for people without photos, and the rating in words", () => {
    render(<SocialProof {...props} />);
    expect(screen.getByText(props.text)).toBeTruthy();
    expect(screen.getByText("A")).toBeTruthy();
    expect(screen.getByText("Rated 4.8 out of 5")).toBeTruthy();
  });
  it("omits the rating when not given", () => {
    render(<SocialProof text="Hi" people={[]} />);
    expect(screen.queryByText(/Rated/)).toBeNull();
  });
});
describe("SocialProofMotion", () => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<SocialProofMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<SocialProofMotion {...props} />);
    expect(textOf(html)).toContain(props.text);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
