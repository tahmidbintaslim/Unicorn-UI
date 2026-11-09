import { PricingTemplateMotion } from "@/components/templates/pricing/pricing-motion";
import { TemplateDemo, templateMetadata } from "../../_ui/demos";

export const metadata = templateMetadata("pricing", true);

export default function Page() {
  return <TemplateDemo slug="pricing" motion Page={PricingTemplateMotion} />;
}
