import { cn } from "@/lib/utils";
import React from "react";

export interface FooterSimpleProps extends React.ComponentProps<"footer"> {
  brand: string;
  links: { label: string; href: string }[];
  /** Small print, such as a copyright line */
  note?: string;
}

/** A one-row footer: brand, a few links and small print. */
export function FooterSimple({ brand, links, note, className, ...props }: FooterSimpleProps) {
  return (
    <footer className={cn("border-t", className)} {...props}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row">
        <span className="font-semibold">{brand}</span>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {note && <p className="text-muted-foreground">{note}</p>}
      </div>
    </footer>
  );
}
