import { SiteFooter } from "../_site/site-footer";
import { SiteHeader } from "../_site/site-header";
import { TemplateCard } from "../_site/template-card";
import { TEMPLATES } from "../_site/templates";

export const metadata = {
  title: "Free templates | Tapas UI",
  description: "Free landing page templates built from Tapas sections, each in a plain and a motion version.",
};

export default function TemplatesIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader showThemeToggle />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="max-w-2xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">Free templates</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Whole pages assembled from Tapas sections. Each one comes plain (server components, CSS only) or with motion,
            installs with one command, and takes your copy through a single <code className="font-mono text-sm">content</code> prop.
            All names and figures in them are fictional samples.
          </p>
        </header>
        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <li key={t.slug}>
              <TemplateCard template={t} />
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
