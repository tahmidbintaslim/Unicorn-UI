import type { Meta, StoryObj } from "@storybook/nextjs";
import { DemoScreen } from "@/app/docs/_content-heroes";
import { FeatureRows } from "./feature-rows";
import { FeatureRowsMotion } from "./feature-rows-motion";

const meta = {
  title: "Features/Feature rows",
  component: FeatureRows,
  args: { rows: [{ label: "Install", title: "One command", description: "Sample copy.", media: <DemoScreen /> }, { label: "Theme", title: "Your colors", description: "Sample copy.", media: <DemoScreen /> }] },
} satisfies Meta<typeof FeatureRows>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <FeatureRowsMotion {...args} /> };
