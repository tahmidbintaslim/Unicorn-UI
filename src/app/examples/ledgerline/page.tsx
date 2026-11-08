import { CtaBanner } from "@/components/custom/cta-banner/cta-banner";
import { Faq } from "@/components/custom/faq/faq";
import { FeatureGrid } from "@/components/custom/feature-grid/feature-grid";
import { HeroWaitlist } from "@/components/custom/hero-waitlist/hero-waitlist";
import { Steps } from "@/components/custom/steps/steps";
import { content as c } from "./content";

const MESSAGES: Record<string, string> = {
  "1": "You're on the list. We'll email you once, at launch.",
  demo: "Demo mode: the form works, but no email list is connected, so nothing was stored.",
  invalid: "That email doesn't look right. Please check it and try again.",
  error: "We couldn't add you just now. Please try again in a minute.",
};

export default async function LedgerlineHome({ searchParams }: { searchParams: Promise<{ joined?: string; checkout?: string }> }) {
  const { joined, checkout } = await searchParams;
  const message = checkout === "success" ? "Test checkout complete. Nothing was charged." : joined && MESSAGES[joined];
  return (
    <>
      <HeroWaitlist id="join" action="/examples/ledgerline/api/waitlist" {...c.hero} />
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
