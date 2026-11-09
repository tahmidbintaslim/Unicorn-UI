"use client";

import { BlogCard } from "@/components/custom/blog-card/blog-card";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { BlogGridHeader, type BlogGridProps } from "./blog-grid";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** BlogGrid with motion: cards rise in one after another as the grid scrolls into view. */
export function BlogGridMotion(props: BlogGridProps) {
  const { title, description, posts, viewAll, className, ...rest } = props;
  const reduced = useReducedMotion();
  const on = useMounted() && !reduced;
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...rest}>
      <BlogGridHeader {...{ title, description, viewAll }} />
      {posts.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              whileInView={on ? { opacity: [0.001, 1], y: [20, 0] } : undefined}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <BlogCard {...post} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
