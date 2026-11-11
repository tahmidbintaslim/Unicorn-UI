import { ChangelogTemplateMotion } from "@/components/templates/changelog/changelog-motion";
import { TemplateDemo, templateMetadata } from "../../_ui/demos";

export const metadata = templateMetadata("changelog", true);

export default function Page() {
  return <TemplateDemo slug="changelog" motion Page={ChangelogTemplateMotion} />;
}
