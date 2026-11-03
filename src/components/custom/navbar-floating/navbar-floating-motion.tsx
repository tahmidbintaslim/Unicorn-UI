"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import React from "react";
import { FloatingNavInner, NavbarFloating, pillClass, type NavbarFloatingProps } from "./navbar-floating";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** NavbarFloating with motion: once you scroll, the pill tightens and lifts with a deeper shadow. */
export function NavbarFloatingMotion(props: NavbarFloatingProps) {
  const { brand, brandHref, links, action, className, ...rest } = props;
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));
  if (!animate) return <NavbarFloating {...props} />;
  return (
    <header className={cn("sticky top-4 z-40 px-4", className)} {...rest}>
      <motion.div
        className={pillClass}
        animate={{
          scale: scrolled ? 0.96 : 1,
          y: scrolled ? -4 : 0,
          boxShadow: scrolled ? "0 12px 32px -12px rgb(0 0 0 / 0.25)" : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <FloatingNavInner {...{ brand, brandHref, links, action }} />
      </motion.div>
    </header>
  );
}
