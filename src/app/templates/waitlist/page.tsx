import { WaitlistTemplate } from "@/components/templates/waitlist/waitlist";
import { TemplateDemo, templateMetadata } from "../_ui/demos";

export const metadata = templateMetadata("waitlist", false);

export default function Page() {
  return <TemplateDemo slug="waitlist" motion={false} Page={WaitlistTemplate} />;
}
