import { MotionLift } from "@/components/custom/motion-lift/motion-lift";
import React from "react";
import { PricingCard, type PricingCardProps } from "./pricing-card";

/**
 * PricingCard with motion: the card lifts on hover with a spring.
 * A server component around a small client island, so every prop works from
 * server pages; reduced motion leaves it still.
 */
export function PricingCardMotion(props: PricingCardProps) {
  return (
    <MotionLift>
      <PricingCard {...props} />
    </MotionLift>
  );
}
