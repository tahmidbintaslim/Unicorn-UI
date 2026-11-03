import type { Meta, StoryObj } from "@storybook/nextjs";
import { samplePlans } from "@/app/docs/_content-sections";
import { PricingTable } from "./pricing-table";
import { PricingTableMotion } from "./pricing-table-motion";

const meta = {
  title: "Marketing/Pricing table",
  component: PricingTable,
  args: { title: "Simple pricing", description: "Sample prices.", plans: samplePlans, yearlyNote: "2 months free" },
} satisfies Meta<typeof PricingTable>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const TwoPlans: Story = { args: { plans: samplePlans.slice(0, 2) } };
export const Motion: Story = { render: (args) => <PricingTableMotion {...args} /> };
