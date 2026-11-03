import { SiteFooter } from "../_site/site-footer";
import { SiteHeader } from "../_site/site-header";
import { SECTIONS } from "../_site/sections";
import { DocsNav } from "./_nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader showThemeToggle />
      <div className="mx-auto flex max-w-7xl gap-10 px-4 sm:px-6 lg:px-8">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto border-r py-8 pr-4 lg:block">
          <DocsNav sections={SECTIONS} />
        </aside>
        <div className="min-w-0 flex-1 py-10">
          {/* Phones and tablets get the sidebar as a disclosure above the content. */}
          <details className="group mb-8 rounded-xl border bg-card lg:hidden">
            <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
              Browse the docs
              <span aria-hidden="true" className="float-right text-muted-foreground group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="border-t px-2 py-4">
              <DocsNav sections={SECTIONS} />
            </div>
          </details>
          {children}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
