"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SectionMeta } from "../_site/sections";

type Group = { name: string; items: SectionMeta[] };

/** Docs sidebar; client-side only to highlight the current page. */
export function DocsNav({ groups: sectionGroups }: { groups: Group[] }) {
  const pathname = usePathname();
  const groups = sectionGroups;
  const nav = [
    {
      title: "Getting started",
      links: [
        { label: "Introduction", href: "/docs" },
        { label: "Installation", href: "/docs/installation" },
        { label: "Theming", href: "/docs/theming" },
      ],
    },
    ...groups.map((g) => ({
      title: g.name,
      links: g.items.map((s) => ({ label: s.title, href: `/docs/sections/${s.slug}` })),
    })),
  ];

  return (
    <nav aria-label="Docs" className="space-y-7 text-sm">
      {nav.map((group) => (
        <div key={group.title} className="space-y-1.5">
          <h2 className="px-2.5 text-xs font-semibold text-muted-foreground">{group.title}</h2>
          <ul className="space-y-0.5">
            {group.links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-2.5 py-2.5 lg:py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-brand",
                      active
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
