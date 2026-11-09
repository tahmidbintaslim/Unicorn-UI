import type { Meta, StoryObj } from "@storybook/nextjs";
import { sampleChangelog } from "@/app/docs/_content-sections";
import { Changelog } from "./changelog";
import { ChangelogMotion } from "./changelog-motion";

const meta = {
  title: "Company/Changelog",
  component: Changelog,
  args: { entries: sampleChangelog },
} satisfies Meta<typeof Changelog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <ChangelogMotion {...args} /> };
