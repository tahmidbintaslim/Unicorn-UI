import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { HeroVideo } from "./hero-video";
import { HeroVideoMotion } from "./hero-video-motion";

const props = { title: "Watch it in 60 seconds", poster: "/demo/blog-cover.webp", posterAlt: "Product tour", videoSrc: "https://example.com/tour.mp4" };

describe("HeroVideo", () => {
  it("plain renders a video with controls", () => {
    const { container } = render(<HeroVideo {...props} captionsSrc="/tour.vtt" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(props.title);
    const video = container.querySelector("video");
    expect(video?.hasAttribute("controls")).toBe(true);
    expect(video?.getAttribute("poster")).toBe(props.poster);
    expect(container.querySelector('track[kind="captions"]')?.getAttribute("src")).toBe("/tour.vtt");
  });
});
describe("HeroVideoMotion", () => {
  it("motion play button has a descriptive label", () => {
    render(<HeroVideoMotion {...props} />);
    expect(screen.getByRole("button", { name: "Play video: Product tour" })).toBeTruthy();
  });
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroVideoMotion {...props} />);
    expect(animatedElements(container)).toHaveLength(0);
    expect(container.querySelector("video[controls]")).toBeTruthy();
  });
  it("SSR output is visible", () => {
    const html = renderToString(<HeroVideoMotion {...props} />);
    expect(textOf(html)).toContain(props.title);
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
