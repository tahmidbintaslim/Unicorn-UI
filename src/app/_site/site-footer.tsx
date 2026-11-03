import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { CONTRIBUTING_URL, GITHUB_URL, GOOD_FIRST_ISSUES_URL } from "./links";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Sections", href: "/docs/sections" },
      { label: "Hero", href: "/docs/sections/hero" },
      { label: "Pricing card", href: "/docs/sections/pricing-card" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Theming", href: "/docs/theming" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: GITHUB_URL },
      { label: "Contributing", href: CONTRIBUTING_URL },
      { label: "Good first issues", href: GOOD_FIRST_ISSUES_URL },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-14 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <div className="max-w-xs space-y-3">
          <p className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
            <BrandMark />
            Tapas UI
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Small plates for your landing page. MIT licensed. Built by Tahmid Bin Taslim.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
          {COLUMNS.map((column) => (
            <div key={column.title} className="space-y-3">
              <h2 className="text-[13px] font-semibold">{column.title}</h2>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
