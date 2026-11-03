import { MotionLift } from "@/components/custom/motion-lift/motion-lift";
import React from "react";
import { StatisticsCard, type StatisticsCardProps } from "./statistics-card";

/**
 * StatisticsCard with motion: the card counts up to its number once in view and lifts on hover.
 * A server component around a small client island, so every prop works from
 * server pages; reduced motion leaves it still.
 */
export function StatisticsCardMotion(props: StatisticsCardProps) {
  return (
    <MotionLift>
      <StatisticsCard {...props} />
    </MotionLift>
  );
}
