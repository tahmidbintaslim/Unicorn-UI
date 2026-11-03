import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { CONTRIBUTING_URL, GITHUB_URL } from "./links";

const NAV = [
  { label: "Sections", href: "/docs/sections" },
  { label: "Docs", href: "/docs" },
  { label: "Contribute", href: CONTRIBUTING_URL },
];

/** Top bar shared by the landing page and the docs. */
export function SiteHeader({
  showThemeToggle = false,
  className,
}: {
  /** The landing page is always dark, so only the docs offer the toggle. */
  showThemeToggle?: boolean;
  className?: string;
}) {
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
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href={GITHUB_URL}>
              <Github aria-hidden="true" />
              Star on GitHub
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="/docs">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
