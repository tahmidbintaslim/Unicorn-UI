import { NotFound } from "@/components/custom/not-found/not-found";
import { SiteFooter } from "./_site/site-footer";
import { SiteHeader } from "./_site/site-header";

export const metadata = { title: "Page not found | Tapas UI", robots: { index: false } };

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <NotFound links={[{ label: "Browse sections", href: "/docs/sections" }, { label: "Templates", href: "/templates" }]} />
      </main>
      <SiteFooter />
    </div>
  );
}
