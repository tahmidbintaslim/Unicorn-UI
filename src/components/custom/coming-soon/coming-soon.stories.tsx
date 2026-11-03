import type { Meta, StoryObj } from "@storybook/nextjs";
import { ComingSoon } from "./coming-soon";

const meta = {
  title: "Utility/Coming soon",
  component: ComingSoon,
  args: { title: "Something new is cooking", action: "#notify", launchDate: "2026-12-01" },
} satisfies Meta<typeof ComingSoon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
