import { MotionLift } from "@/components/custom/motion-lift/motion-lift";
import React from "react";
import { BlogCard, type BlogCardProps } from "./blog-card";

/**
 * BlogCard with motion: the card lifts on hover with a spring.
 * A server component around a small client island, so every prop works from
 * server pages; reduced motion leaves it still.
 */
export function BlogCardMotion(props: BlogCardProps) {
  return (
    <MotionLift>
      <BlogCard {...props} />
    </MotionLift>
  );
}
