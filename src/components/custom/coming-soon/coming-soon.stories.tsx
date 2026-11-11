import type { Meta, StoryObj } from "@storybook/nextjs";
import { ComingSoon } from "./coming-soon";
import { ComingSoonMotion } from "./coming-soon-motion";

const meta = {
  title: "Utility/Coming soon",
  component: ComingSoon,
  args: { title: "Something new is cooking", action: "#notify", launchDate: "2026-12-01" },
} satisfies Meta<typeof ComingSoon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <ComingSoonMotion {...args} /> };
