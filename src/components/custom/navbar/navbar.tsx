import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import React from "react";

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarProps extends React.ComponentProps<"header"> {
  brand: string;
  brandHref?: string;
  links: NavbarLink[];
  /** Optional call to action on the right, such as "Get started" */
  action?: NavbarLink;
}

/**
 * Top navigation bar. On small screens the links fold into a native
 * details/summary menu, so it works without JavaScript.
 */
export function Navbar({ brand, brandHref = "/", links, action, className, ...props }: NavbarProps) {
  const linkClass =
    "text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring";
  return (
    <header className={cn("border-b bg-background", className)} {...props}>
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href={brandHref} className="text-lg font-bold">
          {brand}
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {action && (
            <Button asChild size="sm">
              <a href={action.href}>{action.label}</a>
            </Button>
          )}
          <details className="relative md:hidden">
            <summary className="flex cursor-pointer list-none items-center rounded-md p-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring">
              <Menu aria-hidden="true" className="size-5" />
              <span className="sr-only">Menu</span>
            </summary>
            <ul className="absolute right-0 z-10 mt-2 w-48 rounded-md border bg-background p-2 shadow-md">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={cn(linkClass, "block rounded px-3 py-2 hover:bg-muted")}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
