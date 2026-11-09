import type { Meta, StoryObj } from "@storybook/nextjs";
import { samplePeople } from "@/app/docs/_content-sections";
import { Team } from "./team";
import { TeamMotion } from "./team-motion";

const meta = {
  title: "Company/Team",
  component: Team,
  args: { title: "The people behind it", people: samplePeople },
} satisfies Meta<typeof Team>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <TeamMotion {...args} /> };
