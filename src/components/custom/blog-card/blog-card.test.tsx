import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BlogCard } from "./blog-card";

const post = {
  title: "Building modern UI components",
  excerpt: "Sample excerpt.",
  author: "Sarah Wilson",
  date: "2024-01-15",
  readTime: "8 min read",
  likes: 127,
};

describe("BlogCard", () => {
  it("is an article with a machine-readable date that does not shift by time zone", () => {
    const { container } = render(<BlogCard {...post} />);

    const article = container.querySelector("article");
    expect(article).not.toBeNull();
    const time = article?.querySelector("time");
    expect(time?.getAttribute("dateTime")).toBe("2024-01-15");
    expect(time?.textContent).toBe("Jan 15, 2024");
    expect(screen.getByText("127").textContent).toBe("127 likes");
  });

  it("with href, the title is the only control and no button sits inside the link", () => {
    render(<BlogCard {...post} href="/blog/sample" />);

    const link = screen.getByRole("link", { name: post.title });
    expect(link.getAttribute("href")).toBe("/blog/sample");
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(link.querySelector("a, button")).toBeNull();
  });

  it("with onClick only, the title is a button", () => {
    const onClick = vi.fn();
    render(<BlogCard {...post} onClick={onClick} />);

    const button = screen.getByRole("button", { name: post.title });
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    button.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("without href or onClick, it has no controls", () => {
    render(<BlogCard {...post} />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("renders the cover image as decorative with a sizes hint", () => {
    const { container } = render(
      <BlogCard {...post} image="/demo/blog-cover.webp" />,
    );
    const img = container.querySelector("img");
    expect(img?.getAttribute("alt")).toBe("");
    expect(img?.getAttribute("sizes")).toBe("(min-width: 768px) 50vw, 100vw");
  });
});
