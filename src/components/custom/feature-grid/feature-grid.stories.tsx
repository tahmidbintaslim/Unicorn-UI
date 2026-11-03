import type { Meta, StoryObj } from "@storybook/nextjs";
import { sampleFeatures } from "@/app/docs/_content-sections";
import { FeatureGrid } from "./feature-grid";
import { FeatureGridMotion } from "./feature-grid-motion";

const meta = {
  title: "Features/Feature grid",
  component: FeatureGrid,
  args: { title: "Everything a launch page needs", items: sampleFeatures },
} satisfies Meta<typeof FeatureGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <FeatureGridMotion {...args} /> };
