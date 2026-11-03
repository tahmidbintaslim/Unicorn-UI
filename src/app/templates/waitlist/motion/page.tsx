import { WaitlistTemplateMotion } from "@/components/templates/waitlist/waitlist-motion";
import { TemplateDemo, templateMetadata } from "../../_ui/demos";

export const metadata = templateMetadata("waitlist", true);

export default function Page() {
  return <TemplateDemo slug="waitlist" motion Page={WaitlistTemplateMotion} />;
}
