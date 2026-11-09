import { ComparisonTable } from "@/components/custom/comparison-table/comparison-table";
import { PricingTable } from "@/components/custom/pricing-table/pricing-table";
import { content as c } from "../content";

export const metadata = { title: "Pricing" };

export default function StackwisePricing() {
  return (
    <>
      <h1 className="sr-only">{c.brand.name} pricing</h1>
      <PricingTable {...c.pricing} />
      <ComparisonTable {...c.comparison} />
    </>
  );
}
