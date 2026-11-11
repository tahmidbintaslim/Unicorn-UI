import { MobileAppTemplateMotion } from "@/components/templates/mobile-app/mobile-app-motion";
import { TemplateDemo, templateMetadata } from "../../_ui/demos";

export const metadata = templateMetadata("mobile-app", true);

export default function Page() {
  return <TemplateDemo slug="mobile-app" motion Page={MobileAppTemplateMotion} />;
}
