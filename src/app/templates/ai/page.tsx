import { AiTemplate } from "@/components/templates/ai/ai";
import { TemplateDemo, templateMetadata } from "../_ui/demos";

export const metadata = templateMetadata("ai", false);

export default function Page() {
  return <TemplateDemo slug="ai" motion={false} Page={AiTemplate} />;
}
