import { AiTemplate } from "@/components/templates/ai/ai";
import { AiTemplateMotion } from "@/components/templates/ai/ai-motion";
import { SaasTemplate } from "@/components/templates/saas/saas";
import { SaasTemplateMotion } from "@/components/templates/saas/saas-motion";
import { WaitlistTemplate } from "@/components/templates/waitlist/waitlist";
import { WaitlistTemplateMotion } from "@/components/templates/waitlist/waitlist-motion";
import { notFound } from "next/navigation";
import { getTemplate } from "../../_site/templates";
import { TemplateBar } from "./template-bar";

const DEMOS: Record<string, { plain: React.ComponentType; motion: React.ComponentType }> = {
  saas: { plain: SaasTemplate, motion: SaasTemplateMotion },
  waitlist: { plain: WaitlistTemplate, motion: WaitlistTemplateMotion },
  ai: { plain: AiTemplate, motion: AiTemplateMotion },
};

export const templateMetadata = (slug: string, motion: boolean) => {
  const t = getTemplate(slug);
  return t ? { title: `${t.title}${motion ? " (motion)" : ""} template | Tapas UI`, description: t.description } : {};
};

/** A full-page template demo under the switch bar. */
export function TemplateDemo({ slug, motion }: { slug: string; motion: boolean }) {
  const template = getTemplate(slug);
  const demo = DEMOS[slug];
  if (!template || !demo) notFound();
  const Page = motion ? demo.motion : demo.plain;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TemplateBar template={template} motion={motion} />
      <Page />
    </div>
  );
}
