"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import React from "react";
import { Navbar, type NavbarProps } from "./navbar";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** The scroll-aware wrapper; split out so its hooks only run once motion is on. */
function ScrollAwareNavbar({ className, ...props }: NavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const focusInside = React.useRef(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    // Hide after scrolling down past the bar; show on any scroll up. Never hide while it holds focus.
    setHidden(!focusInside.current && y > prev && y > 80);
  });
  return (
    <motion.div
      className={cn("sticky top-0 z-40", className)}
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onFocusCapture={() => {
        focusInside.current = true;
        setHidden(false);
      }}
      onBlurCapture={() => (focusInside.current = false)}
    >
      <Navbar {...props} />
    </motion.div>
  );
}

/** Navbar with motion: sticks to the top, slides away while you scroll down and back as soon as you scroll up. */
export function NavbarMotion(props: NavbarProps) {
  const reduced = useReducedMotion();
  if (!useMounted() || reduced) return <Navbar {...props} className={cn("sticky top-0 z-40", props.className)} />;
  return <ScrollAwareNavbar {...props} />;
}
