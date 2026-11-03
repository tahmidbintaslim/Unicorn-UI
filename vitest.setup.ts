import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";
import { installMotionMocks, mockReducedMotion } from "./src/test/motion";

installMotionMocks();

beforeEach(() => {
  mockReducedMotion(false);
});

// Testing Library only cleans up on its own when test globals are enabled.
afterEach(() => {
  cleanup();
});
