import { CtaBanner } from "@/components/custom/cta-banner/cta-banner";
import { Faq } from "@/components/custom/faq/faq";
import { FeatureGrid } from "@/components/custom/feature-grid/feature-grid";
import { HeroWaitlist } from "@/components/custom/hero-waitlist/hero-waitlist";
import { Steps } from "@/components/custom/steps/steps";
import { statusMessage } from "../_lib/waitlist";
import { content as c } from "./content";

export default async function LedgerlineHome({ searchParams }: { searchParams: Promise<{ joined?: string; checkout?: string }> }) {
  const message = statusMessage(await searchParams);
  return (
    <>
      <HeroWaitlist id="join" action="/examples/ledgerline/api/waitlist" honeypotName="website" {...c.hero} />
      {message && (
        <p role="status" className="mx-auto -mt-6 mb-10 max-w-md rounded-lg border bg-muted/50 px-4 py-3 text-center text-sm">
          {message}
        </p>
      )}
      <FeatureGrid id="features" {...c.features} />
      <Steps {...c.steps} />
      <Faq {...c.faq} />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <CtaBanner {...c.cta} />
      </div>
    </>
  );
}
