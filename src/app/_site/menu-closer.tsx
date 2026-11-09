"use client";

import { usePathname } from "next/navigation";
import React from "react";

const openMenus = () => document.querySelectorAll<HTMLDetailsElement>("details[data-menu][open]");

/**
 * Native <details> menus work without JavaScript; this adds what people expect on top:
 * Escape closes the menu and returns focus to its button, a click outside closes it,
 * and moving to another page closes it. Mark a menu with `data-menu`.
 */
export function MenuCloser() {
  const pathname = usePathname();
  const last = React.useRef(pathname);

  React.useEffect(() => {
    if (last.current === pathname) return;
    last.current = pathname;
    openMenus().forEach((d) => (d.open = false));
  }, [pathname]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      openMenus().forEach((d) => {
        const hadFocus = d.contains(document.activeElement);
        d.open = false;
        if (hadFocus) d.querySelector("summary")?.focus();
      });
    };
    const onClick = (e: MouseEvent) => {
      openMenus().forEach((d) => {
        if (!d.contains(e.target as Node)) d.open = false;
      });
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
