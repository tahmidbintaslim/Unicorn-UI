"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import React from "react";
import { NotFound, NotFoundCopy, type NotFoundProps } from "./not-found";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

/** NotFound with motion: the big number tilts toward the mouse pointer. */
export function NotFoundMotion(props: NotFoundProps) {
  const {
    code = "404",
    title = "Page not found",
    description = "The page you're looking for moved or never existed.",
    home = { label: "Back to home", href: "/" },
    links,
    titleAs,
    className,
    ...rest
  } = props;
  const reduced = useReducedMotion();
  const animate = useMounted() && !reduced;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 15 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 15 });
  if (!animate) return <NotFound {...props} />;
  return (
    <section
      className={cn("mx-auto max-w-2xl px-4 py-24 text-center [perspective:800px]", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      {...rest}
    >
      <motion.p aria-hidden="true" style={{ rotateX, rotateY }} className="text-8xl font-black tracking-tighter text-primary sm:text-9xl">
        {code}
      </motion.p>
      <NotFoundCopy {...{ title, description, home, links, titleAs }} />
    </section>
  );
}
