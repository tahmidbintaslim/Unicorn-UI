import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { getStarCount } from "./github-stars";
import { CONTRIBUTING_URL } from "./links";
import { StarButton } from "./star-button";

const NAV = [
  { label: "Sections", href: "/docs/sections" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs" },
  { label: "Contribute", href: CONTRIBUTING_URL },
];

/** Top bar shared by the landing page and the docs. */
export async function SiteHeader({
  showThemeToggle = false,
  className,
}: {
  /** The landing page is always dark, so only the docs offer the toggle. */
  showThemeToggle?: boolean;
  className?: string;
}) {
  const stars = await getStarCount();
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md text-[17px] font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <BrandMark />
          Tapas UI
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {showThemeToggle && <ThemeToggle />}
          <StarButton count={stars} className="hidden sm:inline-flex" />
          <Button asChild size="sm">
            <Link href="/docs">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
