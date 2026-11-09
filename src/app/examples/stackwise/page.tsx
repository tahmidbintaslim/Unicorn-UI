import { CtaBanner } from "@/components/custom/cta-banner/cta-banner";
import { Faq } from "@/components/custom/faq/faq";
import { HeroShaderMotion } from "@/components/custom/hero-shader/hero-shader-motion";
import { IntegrationsGrid } from "@/components/custom/integrations-grid/integrations-grid";
import { Newsletter } from "@/components/custom/newsletter/newsletter";
import { StatsBandMotion } from "@/components/custom/stats-band/stats-band-motion";
import { TestimonialsWallMotion } from "@/components/custom/testimonials-wall/testimonials-wall-motion";
import { Suspense } from "react";
import { StatusLine } from "../_lib/status-line";
import { content as c } from "./content";

export default function StackwiseHome() {
  return (
    <>
      <HeroShaderMotion {...c.hero} />
      <IntegrationsGrid id="integrations" {...c.integrations} />
      <StatsBandMotion {...c.stats} />
      <TestimonialsWallMotion {...c.testimonials} />
      <Faq id="faq" {...c.faq} />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <CtaBanner {...c.cta} />
      </div>
      <Newsletter id="join" action="/examples/stackwise/api/waitlist" honeypotName="website" {...c.newsletter} />
      {/* Under the form: the redirect lands on #join, so the outcome shows where the reader is. */}
      <Suspense fallback={null}>
        <StatusLine className="mx-4 -mt-6 mb-16 max-w-md sm:mx-auto rounded-lg border bg-muted/50 px-4 py-3 text-center text-sm" />
      </Suspense>
    </>
  );
}
