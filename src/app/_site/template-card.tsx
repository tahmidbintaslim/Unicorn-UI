import Link from "next/link";
import { getSection } from "./sections";
import type { TemplateMeta } from "./templates";

/** Live, scaled-down preview of a template page in a browser frame. Decorative: the card's links are the controls. */
function Preview({ template }: { template: TemplateMeta }) {
  return (
    <div aria-hidden="true" className="border-b bg-muted/40">
      <div className="flex items-center gap-1.5 border-b px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-border" />
        ))}
        <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">tapas-ui.vercel.app/templates/{template.slug}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-background">
        <iframe
          src={`/templates/${template.slug}`}
          title={`${template.title} preview`}
          loading="lazy"
          tabIndex={-1}
          // A 1280px-wide page at roughly card width; pointer-events off so wheel and taps reach the gallery, not the frame.
          className="pointer-events-none absolute top-0 left-0 h-[800px] w-[1280px] origin-top-left scale-[0.27] sm:scale-[0.3] md:scale-[0.27] lg:scale-[0.29]"
        />
      </div>
    </div>
  );
}

/** One free template: live preview, what it's built from, and links to both versions. */
export function TemplateCard({ template: t, headingLevel: H = "h2" }: { template: TemplateMeta; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-left">
      <Preview template={t} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <H className="text-lg font-semibold">{t.title}</H>
        <p className="text-sm leading-relaxed text-muted-foreground">{t.description}</p>
        <p className="text-xs text-muted-foreground">Built from: {t.sections.map((s) => getSection(s)?.title ?? s).join(", ")}</p>
        <div className="mt-auto flex gap-2 pt-2">
          <Link href={`/templates/${t.slug}`} aria-label={`View plain ${t.title}`} className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            View plain
          </Link>
          <Link href={`/templates/${t.slug}/motion`} aria-label={`View motion ${t.title}`} className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted">
            View motion
          </Link>
        </div>
      </div>
    </article>
  );
}
