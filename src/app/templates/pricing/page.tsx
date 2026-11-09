import { PricingTemplate } from "@/components/templates/pricing/pricing";
import { TemplateDemo, templateMetadata } from "../_ui/demos";

export const metadata = templateMetadata("pricing", false);

export default function Page() {
  return <TemplateDemo slug="pricing" motion={false} Page={PricingTemplate} />;
}
