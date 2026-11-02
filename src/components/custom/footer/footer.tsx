import { cn } from "@/lib/utils";
import React from "react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends React.ComponentProps<"footer"> {
  brand: string;
  columns: FooterColumn[];
  /** Small print under the columns, such as a copyright line */
  note?: string;
}

/** Site footer with a brand name, link columns and a small-print line. */
export function Footer({ brand, columns, note, className, ...props }: FooterProps) {
  return (
    <footer className={cn("border-t px-4 py-12", className)} {...props}>
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:justify-between">
        <p className="text-xl font-bold">{brand}</p>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-3 text-sm font-semibold">{column.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      {note && <p className="mx-auto mt-8 max-w-5xl text-sm text-muted-foreground">{note}</p>}
    </footer>
  );
}
