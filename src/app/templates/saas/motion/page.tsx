import { SaasTemplateMotion } from "@/components/templates/saas/saas-motion";
import { TemplateDemo, templateMetadata } from "../../_ui/demos";

export const metadata = templateMetadata("saas", true);

export default function Page() {
  return <TemplateDemo slug="saas" motion Page={SaasTemplateMotion} />;
}
