import { SaasTemplate } from "@/components/templates/saas/saas";
import { TemplateDemo, templateMetadata } from "../_ui/demos";

export const metadata = templateMetadata("saas", false);

export default function Page() {
  return <TemplateDemo slug="saas" motion={false} Page={SaasTemplate} />;
}
