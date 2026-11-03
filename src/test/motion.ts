/**
 * Test helpers for motion components. `useReducedMotion` reads
 * matchMedia("(prefers-reduced-motion: reduce)"); jsdom has no matchMedia.
 */
let reduced = false;
const listeners = new Set<(e: { matches: boolean }) => void>();

/** Flip the reduced-motion preference; motion caches the query, so fire change events. */
export function mockReducedMotion(on: boolean) {
  reduced = on;
  listeners.forEach((fn) => fn({ matches: on }));
}

/** Strip tags so text split across spans can be matched. */
export const textOf = (html: string) => html.replace(/<[^>]+>/g, "").replace(/&#x27;/g, "'");

export function installMotionMocks() {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => {
      const isMotion = query.includes("prefers-reduced-motion");
      return {
        get matches() {
          return isMotion ? reduced : false;
        },
        media: query,
        onchange: null,
        addListener: (fn: (e: { matches: boolean }) => void) => isMotion && listeners.add(fn),
        removeListener: (fn: (e: { matches: boolean }) => void) => listeners.delete(fn),
        addEventListener: (_: string, fn: (e: { matches: boolean }) => void) => isMotion && listeners.add(fn),
        removeEventListener: (_: string, fn: (e: { matches: boolean }) => void) => listeners.delete(fn),
        dispatchEvent: () => false,
      };
    },
  });
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = "";
    thresholds = [];
  }
  class RO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(window, "ResizeObserver", { configurable: true, writable: true, value: RO });
  Object.defineProperty(window, "IntersectionObserver", { configurable: true, writable: true, value: IO });
  Object.defineProperty(globalThis, "IntersectionObserver", { configurable: true, writable: true, value: IO });
}

/** Elements carrying inline animation styles (motion writes transform/opacity inline). */
export const animatedElements = (root: Element) =>
  [...root.querySelectorAll<HTMLElement>("*")].filter((el) => el.style.transform || el.style.opacity);
