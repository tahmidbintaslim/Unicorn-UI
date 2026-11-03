import { BlogCard, type BlogCardProps } from "@/components/custom/blog-card/blog-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export type BlogGridPost = Pick<BlogCardProps, "title" | "excerpt" | "author" | "date" | "href" | "image" | "readTime" | "category">;

export interface BlogGridProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  posts: BlogGridPost[];
  viewAll?: { label: string; href: string };
}

/** Header shared by the plain and motion versions. */
export function BlogGridHeader({ title, description, viewAll }: Pick<BlogGridProps, "title" | "description" | "viewAll">) {
  if (!title && !description && !viewAll) return null;
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {title && <h2 className="text-3xl font-bold tracking-tight text-balance">{title}</h2>}
        {description && <p className="mt-2 text-muted-foreground">{description}</p>}
      </div>
      {viewAll && (
        <Button asChild variant="outline" className="w-fit">
          <a href={viewAll.href}>{viewAll.label}</a>
        </Button>
      )}
    </div>
  );
}

/** A grid of recent posts built from BlogCard. */
export function BlogGrid({ title, description, posts, viewAll, className, ...props }: BlogGridProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...props}>
      <BlogGridHeader {...{ title, description, viewAll }} />
      {posts.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>
      )}
    </section>
  );
}
