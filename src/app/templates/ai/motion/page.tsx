import { AiTemplateMotion } from "@/components/templates/ai/ai-motion";
import { TemplateDemo, templateMetadata } from "../../_ui/demos";

export const metadata = templateMetadata("ai", true);

export default function Page() {
  return <TemplateDemo slug="ai" motion Page={AiTemplateMotion} />;
}
