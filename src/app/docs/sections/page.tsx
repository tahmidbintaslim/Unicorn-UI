import { SectionCard } from "../../_site/section-card";
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
                <SectionCard section={s} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
