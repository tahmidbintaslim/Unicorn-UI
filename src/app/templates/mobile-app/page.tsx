import { MobileAppTemplate } from "@/components/templates/mobile-app/mobile-app";
import { TemplateDemo, templateMetadata } from "../_ui/demos";

export const metadata = templateMetadata("mobile-app", false);

export default function Page() {
  return <TemplateDemo slug="mobile-app" motion={false} Page={MobileAppTemplate} />;
}
