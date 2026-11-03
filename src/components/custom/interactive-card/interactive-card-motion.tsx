import { MotionLift } from "@/components/custom/motion-lift/motion-lift";
import React from "react";
import { InteractiveCard, type InteractiveCardProps } from "./interactive-card";

/**
 * InteractiveCard with motion: the card lifts on hover with a spring.
 * A server component around a small client island, so every prop works from
 * server pages; reduced motion leaves it still.
 */
export function InteractiveCardMotion(props: InteractiveCardProps) {
  return (
    <MotionLift>
      <InteractiveCard {...props} />
    </MotionLift>
  );
}
