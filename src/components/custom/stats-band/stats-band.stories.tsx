import type { Meta, StoryObj } from "@storybook/nextjs";

import { StatsBand } from "./stats-band";
import { StatsBandMotion } from "./stats-band-motion";

const meta = {
  title: "Proof/Stats band",
  component: StatsBand,
  args: { title: "By the numbers", stats: [{ value: 12000, label: "Installs", suffix: "+" }, { value: 99.9, label: "Uptime", suffix: "%", decimals: 1 }, { value: 4, label: "Templates" }] },
} satisfies Meta<typeof StatsBand>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <StatsBandMotion {...args} /> };
