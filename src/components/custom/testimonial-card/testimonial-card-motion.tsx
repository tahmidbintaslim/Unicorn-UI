import { MotionLift } from "@/components/custom/motion-lift/motion-lift";
import React from "react";
import { TestimonialCard, type TestimonialCardProps } from "./testimonial-card";

/**
 * TestimonialCard with motion: the card lifts on hover with a spring.
 * A server component around a small client island, so every prop works from
 * server pages; reduced motion leaves it still.
 */
export function TestimonialCardMotion(props: TestimonialCardProps) {
  return (
    <MotionLift>
      <TestimonialCard {...props} />
    </MotionLift>
  );
}
