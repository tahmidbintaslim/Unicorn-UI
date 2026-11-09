import { pageMeta } from "@/app/_site/meta";
import { notFound } from "next/navigation";
import { getTemplate } from "../../_site/templates";
import { TemplateBar } from "./template-bar";

export const templateMetadata = (slug: string, motion: boolean) => {
  const t = getTemplate(slug);
  return t ? pageMeta(`${t.title}${motion ? " (motion)" : ""} template | Tapas UI`, t.description, `/templates/${slug}${motion ? "/motion" : ""}`) : {};
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
