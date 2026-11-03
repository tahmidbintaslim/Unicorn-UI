import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { animatedElements, mockReducedMotion, textOf } from "@/test/motion";
import { BlogGrid } from "./blog-grid";
import { BlogGridMotion } from "./blog-grid-motion";

const posts = [
  { title: "Post one", excerpt: "First.", author: "Ana", date: "2026-01-02", href: "/p/1" },
  { title: "Post two", excerpt: "Second.", author: "Ben", date: "2026-01-03", href: "/p/2" },
];

describe("BlogGrid", () => {
  it("renders an h2, a list of articles and a view-all link", () => {
    render(<BlogGrid title="From the blog" posts={posts} viewAll={{ label: "All posts", href: "/blog" }} />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("From the blog");
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "All posts" }).getAttribute("href")).toBe("/blog");
  });
});
describe("BlogGridMotion", () => {
  it("reduced motion renders plain", () => {
    mockReducedMotion(true);
    const { container } = render(<BlogGridMotion posts={posts} />);
    expect(animatedElements(container)).toHaveLength(0);
  });
  it("SSR output is visible", () => {
    const html = renderToString(<BlogGridMotion posts={posts} />);
    expect(textOf(html)).toContain("Post two");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
