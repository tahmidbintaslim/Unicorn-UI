import { render, screen } from "@testing-library/react";
import { Zap } from "lucide-react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { BlogCard } from "./blog-card";
import { FeatureCard } from "./feature-card";
import { InteractiveCard } from "./interactive-card";
import { StatisticsCard } from "./statistics-card";

describe("InteractiveCard", () => {
  it("forwards ref and root props and calls onAction", () => {
    const ref = createRef<HTMLDivElement>();
    const onAction = vi.fn();
    render(
      <InteractiveCard
        ref={ref}
        id="launch"
        data-testid="root"
        title="Product launch"
        description="Sample description."
        actionText="Register now"
        onAction={onAction}
      />,
    );

    const root = screen.getByTestId("root");
    expect(ref.current).toBe(root);
    expect(root.id).toBe("launch");
    screen.getByRole("button", { name: "Register now" }).click();
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("merges className over the defaults", () => {
    render(
      <InteractiveCard
        data-testid="root"
        title="Card"
        description="Sample description."
        className="border-0"
      />,
    );
    const classes = screen.getByTestId("root").className.split(" ");
    expect(classes).toContain("border-0");
    expect(classes).not.toContain("border-2");
  });
});

describe("FeatureCard", () => {
  it("forwards ref, hides the icon and describes the call to action with the title", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <FeatureCard
        ref={ref}
        data-testid="root"
        title="Advanced analytics"
        description="Sample description."
        icon={Zap}
        ctaText="Explore analytics"
      />,
    );

    expect(ref.current).toBe(screen.getByTestId("root"));
    for (const icon of container.querySelectorAll("svg")) {
      expect(icon.getAttribute("aria-hidden")).toBe("true");
    }
    const button = screen.getByRole("button", { name: "Explore analytics" });
    const describedBy = button.getAttribute("aria-describedby");
    expect(document.getElementById(describedBy!)?.textContent).toContain(
      "Advanced analytics",
    );
  });
});

describe("StatisticsCard and BlogCard", () => {
  it("forward ref and root props", () => {
    const statsRef = createRef<HTMLDivElement>();
    const blogRef = createRef<HTMLElement>();
    render(
      <>
        <StatisticsCard
          ref={statsRef}
          data-testid="stats"
          aria-label="Revenue"
          title="Revenue"
          value={1}
        />
        <BlogCard
          ref={blogRef}
          data-testid="blog"
          title="Post"
          excerpt="Sample excerpt."
          author="Sarah Wilson"
          date="2024-01-15"
        />
      </>,
    );

    const stats = screen.getByTestId("stats");
    expect(statsRef.current).toBe(stats);
    expect(stats.getAttribute("aria-label")).toBe("Revenue");
    const blog = screen.getByTestId("blog");
    expect(blogRef.current).toBe(blog);
    expect(blog.tagName).toBe("ARTICLE");
  });
});
