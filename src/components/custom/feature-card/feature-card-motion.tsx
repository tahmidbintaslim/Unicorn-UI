import { MotionLift } from "@/components/custom/motion-lift/motion-lift";
import React from "react";
import { FeatureCard, type FeatureCardProps } from "./feature-card";

/**
 * FeatureCard with motion: the card lifts on hover with a spring.
 * A server component around a small client island, so every prop works from
 * server pages; reduced motion leaves it still.
 */
export function FeatureCardMotion(props: FeatureCardProps) {
  return (
    <MotionLift>
      <FeatureCard {...props} />
    </MotionLift>
  );
}
