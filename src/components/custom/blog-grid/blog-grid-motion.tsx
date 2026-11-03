"use client";

import { BlogCard } from "@/components/custom/blog-card";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { BlogGrid, BlogGridHeader, type BlogGridProps } from "./blog-grid";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** BlogGrid with motion: cards rise in one after another as the grid scrolls into view. */
export function BlogGridMotion(props: BlogGridProps) {
  const { title, description, posts, viewAll, className, ...rest } = props;
  const reduced = useReducedMotion();
  if (!useMounted() || reduced || posts.length === 0) return <BlogGrid {...props} />;
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...rest}>
      <BlogGridHeader {...{ title, description, viewAll }} />
      <motion.div
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="out"
        whileInView="in"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {posts.map((post) => (
          <motion.div key={post.title} variants={{ out: { opacity: 0.001, y: 20 }, in: { opacity: 1, y: 0 } }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <BlogCard {...post} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
