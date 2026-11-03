"use client";

// The playground's motion heroes, loaded only when a visitor picks Motion,
// so the landing page's first load carries no motion code. next/dynamic,
// not React.lazy: the App Router bundles "use client" modules reached by a
// bare import() into the page's first load.
import dynamic from "next/dynamic";

export const HeroMotion = dynamic(() => import("@/components/custom/hero/hero-motion").then((m) => m.HeroMotion), { ssr: false });
export const HeroCommandMotion = dynamic(() => import("@/components/custom/hero-command/hero-command-motion").then((m) => m.HeroCommandMotion), { ssr: false });
export const HeroSplitMotion = dynamic(() => import("@/components/custom/hero-split/hero-split-motion").then((m) => m.HeroSplitMotion), { ssr: false });
export const HeroSpotlightMotion = dynamic(() => import("@/components/custom/hero-spotlight/hero-spotlight-motion").then((m) => m.HeroSpotlightMotion), { ssr: false });
export const HeroThemeCycleMotion = dynamic(() => import("@/components/custom/hero-theme-cycle/hero-theme-cycle-motion").then((m) => m.HeroThemeCycleMotion), { ssr: false });
