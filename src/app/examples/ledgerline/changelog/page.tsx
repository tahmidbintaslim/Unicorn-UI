import { Changelog } from "@/components/custom/changelog/changelog";
import { content as c } from "../content";

export const metadata = { title: "Changelog" };

export default function LedgerlineChangelog() {
  return (
    <>
      <h1 className="sr-only">{c.brand.name} changelog</h1>
      <Changelog {...c.changelog} />
    </>
  );
}
