import { ChangelogTemplate } from "@/components/templates/changelog/changelog";
import { TemplateDemo, templateMetadata } from "../_ui/demos";

export const metadata = templateMetadata("changelog", false);

export default function Page() {
  return <TemplateDemo slug="changelog" motion={false} Page={ChangelogTemplate} />;
}
