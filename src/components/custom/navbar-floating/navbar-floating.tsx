import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import React from "react";

export interface NavbarFloatingProps extends React.ComponentProps<"header"> {
  brand: string;
  brandHref?: string;
  links: { label: string; href: string }[];
  action?: { label: string; href: string };
}

/** The pill's contents. Shared by the plain and motion versions. */
export function FloatingNavInner({ brand, brandHref = "/", links, action }: Omit<NavbarFloatingProps, "className">) {
  return (
    <nav aria-label="Main" className="flex items-center justify-between gap-4">
      <a href={brandHref} className="pl-2 font-bold">
        {brand}
      </a>
      <ul className="hidden items-center gap-6 text-sm md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-1">
        {action && (
          <Button asChild size="sm" className="rounded-full">
            <a href={action.href}>{action.label}</a>
          </Button>
        )}
        <details className="relative md:hidden">
          <summary className="grid size-9 cursor-pointer list-none place-items-center rounded-full hover:bg-muted [&::-webkit-details-marker]:hidden">
            <Menu aria-hidden="true" className="size-4" />
            <span className="sr-only">Menu</span>
          </summary>
          <ul className="absolute right-0 mt-2 w-48 rounded-xl border bg-popover p-2 text-sm shadow-lg">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block rounded-md px-3 py-2 hover:bg-muted">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </nav>
  );
}

export const pillClass = "mx-auto max-w-4xl rounded-full border bg-background/80 py-2 pr-2 pl-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70";

/** A pill-shaped navbar floating over the page; links fold into a no-JS menu on phones. */
export function NavbarFloating({ className, ...props }: NavbarFloatingProps) {
  const { brand, brandHref, links, action, ...rest } = props;
  return (
    <header className={cn("sticky top-4 z-40 px-4", className)} {...rest}>
      <div className={pillClass}>
        <FloatingNavInner {...{ brand, brandHref, links, action }} />
      </div>
    </header>
  );
}
