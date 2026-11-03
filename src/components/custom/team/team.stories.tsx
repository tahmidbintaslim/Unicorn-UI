import type { Meta, StoryObj } from "@storybook/nextjs";
import { samplePeople } from "@/app/docs/_content-sections";
import { Team } from "./team";

const meta = {
  title: "Company/Team",
  component: Team,
  args: { title: "The people behind it", people: samplePeople },
} satisfies Meta<typeof Team>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
