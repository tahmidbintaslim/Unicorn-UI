import { Check, GitPullRequest, Layers, PenLine } from "lucide-react";
import { BentoGridMotion } from "@/components/custom/bento-grid/bento-grid-motion";
import { FaqTwoColumn } from "@/components/custom/faq-two-column/faq-two-column";
import { FeatureRowsMotion } from "@/components/custom/feature-rows/feature-rows-motion";
import { HeroCommandMotion } from "@/components/custom/hero-command/hero-command-motion";
import { NewsletterMotion } from "@/components/custom/newsletter/newsletter-motion";
import { PricingTableMotion } from "@/components/custom/pricing-table/pricing-table-motion";
import { statusMessage } from "../_lib/waitlist";
import { content as c } from "./content";

// Motion sections are client components, so icons cross as rendered elements, not component functions.
const ICONS = { git: <GitPullRequest />, pen: <PenLine />, layers: <Layers />, check: <Check /> };

const SAMPLE_NOTES = ["## v1.5.0", "- Export invoices as PDF from the list view", "- Search now matches client names", "- 12 dependency updates"];

function Sample({ lines }: { lines: string[] }) {
  return (
    <pre aria-label="Sample output" className="overflow-x-auto rounded-xl border bg-muted p-5 text-left text-sm leading-relaxed">
      <code>{lines.join("\n")}</code>
    </pre>
  );
}

export default async function PatchnoteHome({ searchParams }: { searchParams: Promise<{ joined?: string; checkout?: string }> }) {
  const message = statusMessage(await searchParams);
  const media = [<Sample key="d" lines={["$ " + c.hero.command, ...SAMPLE_NOTES]} />, <Sample key="p" lines={SAMPLE_NOTES} />];
  return (
    <>
      <HeroCommandMotion {...c.hero} />
      <BentoGridMotion id="features" title={c.features.title} items={c.features.items.map((i) => ({ ...i, icon: ICONS[i.icon as keyof typeof ICONS], size: i.size as "wide" | undefined }))} />
      <FeatureRowsMotion title={c.rows.title} rows={c.rows.rows.map((r, n) => ({ ...r, media: media[n] }))} />
      <PricingTableMotion id="pricing" {...c.pricing} />
      <FaqTwoColumn id="faq" {...c.faq} />
      <NewsletterMotion id="join" action="/examples/patchnote/api/waitlist" honeypotName="website" {...c.newsletter} />
      {/* Under the form: the redirect lands on #join, so the outcome shows where the reader is. */}
      {message && (
        <p role="status" className="mx-4 -mt-6 mb-16 max-w-md sm:mx-auto rounded-lg border bg-muted/50 px-4 py-3 text-center text-sm">
          {message}
        </p>
      )}
    </>
  );
}
