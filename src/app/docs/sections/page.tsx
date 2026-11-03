import Link from "next/link";
import { SectionSketch, SKETCHED_SLUGS } from "../../_landing/section-sketch";
import { GROUPED, SECTIONS } from "../../_site/sections";
import { DocsHeader } from "../_ui";

export const metadata = {
  title: "Sections | Tapas UI",
  description: "Every Tapas UI section and card, each installable with one shadcn CLI command.",
};

export default function SectionsIndex() {
  const groups = GROUPED.map((g) => ({ title: g.name, items: g.items }));
  return (
    <div className="space-y-12">
      <DocsHeader
        title="Sections"
        lead={`${SECTIONS.length} sections and cards, in plain and motion versions. Open one to preview it in your colors, read its props and copy the install command.`}
      />
      {groups.map((group) => (
        <section key={group.title} aria-labelledby={group.title} className="space-y-5">
          <h2 id={group.title} className="text-[22px] font-semibold tracking-tight">
            {group.title}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/docs/sections/${s.slug}`}
                  className="group block h-full overflow-hidden rounded-xl border bg-card transition-colors hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {SKETCHED_SLUGS.includes(s.slug) && (
                    <div className="border-b bg-background">
                      <SectionSketch slug={s.slug} />
                    </div>
                  )}
                  <div className="space-y-1.5 p-4">
                    <h3 className="flex items-center gap-2 font-semibold">
                      {s.title}
                      {s.motionSlug && (
                        <span className="rounded-full border border-brand/40 px-2 py-0.5 text-[11px] font-medium text-brand">Motion</span>
                      )}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
