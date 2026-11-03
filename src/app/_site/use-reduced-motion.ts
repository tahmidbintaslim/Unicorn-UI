"use client";

import React from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * True when the visitor asks for reduced motion; null on the server. A
 * dependency-free stand-in for motion's useReducedMotion, for site code that
 * shouldn't pull the motion library into the landing page bundle.
 */
export function useReducedMotionPref(): boolean | null {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => null,
  );
}
