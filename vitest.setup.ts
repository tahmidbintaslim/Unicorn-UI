import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";
import { installMotionMocks, mockReducedMotion } from "./src/test/motion";

// Node-environment tests (real server renders) have no window to mock.
if (typeof window !== "undefined") installMotionMocks();

beforeEach(() => {
  if (typeof window !== "undefined") mockReducedMotion(false);
});

// Testing Library only cleans up on its own when test globals are enabled.
afterEach(() => {
  cleanup();
});
