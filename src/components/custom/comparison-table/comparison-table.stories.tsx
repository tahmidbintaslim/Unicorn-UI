import type { Meta, StoryObj } from "@storybook/nextjs";
import { ComparisonTable } from "./comparison-table";

const meta = {
  title: "Marketing/Comparison table",
  component: ComparisonTable,
  args: {
    title: "Compare plans",
    caption: "Plans compared feature by feature",
    plans: ["Hobby", "Pro", "Team"],
    rows: [
      { feature: "Projects", values: ["1", "10", "Unlimited"] },
      { feature: "Feature reports", values: [false, true, true] },
      { feature: "Single sign-on", values: [false, false, true] },
    ],
  },
} satisfies Meta<typeof ComparisonTable>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Phone: Story = { globals: { viewport: { value: "mobile1" } } };
