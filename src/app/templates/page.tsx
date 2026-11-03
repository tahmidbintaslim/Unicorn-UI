import Link from "next/link";
import { getSection } from "../_site/sections";
import { SiteFooter } from "../_site/site-footer";
import { SiteHeader } from "../_site/site-header";
import { TEMPLATES } from "../_site/templates";

export const metadata = {
  title: "Free templates | Tapas UI",
  description: "Free landing page templates built from Tapas sections, each in a plain and a motion version.",
};

/** Live, scaled-down preview of a template page. Decorative: the links below it are the controls. */
function Preview({ slug, title }: { slug: string; title: string }) {
  return (
    <div aria-hidden="true" className="relative aspect-[16/10] overflow-hidden border-b bg-background">
      <iframe
        src={`/templates/${slug}`}
        title={`${title} preview`}
        loading="lazy"
        tabIndex={-1}
        // 1280px page shown at a quarter scale; pointer-events off so the card scrolls the gallery, not the frame.
        className="pointer-events-none absolute top-0 left-0 h-[800px] w-[1280px] origin-top-left scale-[0.25] sm:scale-[0.3] lg:scale-[0.28]"
      />
    </div>
  );
}

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
            <li key={t.slug} className="flex flex-col overflow-hidden rounded-xl border bg-card">
              <Preview slug={t.slug} title={t.title} />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h2 className="text-lg font-semibold">{t.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                <p className="text-xs text-muted-foreground">
                  Built from: {t.sections.map((s) => getSection(s)?.title ?? s).join(", ")}
                </p>
                <div className="mt-auto flex gap-2 pt-2">
                  <Link href={`/templates/${t.slug}`} className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    View plain<span className="sr-only"> {t.title}</span>
                  </Link>
                  <Link href={`/templates/${t.slug}/motion`} className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted">
                    View motion<span className="sr-only"> {t.title}</span>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
