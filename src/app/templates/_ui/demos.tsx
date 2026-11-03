import { notFound } from "next/navigation";
import { getTemplate } from "../../_site/templates";
import { TemplateBar } from "./template-bar";

export const templateMetadata = (slug: string, motion: boolean) => {
  const t = getTemplate(slug);
  return t ? { title: `${t.title}${motion ? " (motion)" : ""} template | Tapas UI`, description: t.description } : {};
};

/**
 * A full-page template demo under the switch bar. Each route passes in only
 * its own version, so a plain demo never ships the motion version's code.
 */
export function TemplateDemo({ slug, motion, Page }: { slug: string; motion: boolean; Page: React.ComponentType }) {
  const template = getTemplate(slug);
  if (!template) notFound();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TemplateBar template={template} motion={motion} />
      <Page />
    </div>
  );
}
