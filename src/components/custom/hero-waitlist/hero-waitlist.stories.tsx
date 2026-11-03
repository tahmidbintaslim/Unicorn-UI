import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroWaitlist } from "./hero-waitlist";
import { HeroWaitlistMotion } from "./hero-waitlist-motion";

const meta = {
  title: "Heroes/Waitlist",
  component: HeroWaitlist,
  args: { title: "Be first in line", description: "One email at launch. Sample copy.", action: "#waitlist", note: "No spam." },
} satisfies Meta<typeof HeroWaitlist>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithEyebrow: Story = { args: { eyebrow: "New" } };
export const Motion: Story = {
  // Story args include the section onSubmit event handler; the motion version uses onSubmit for the email.
  render: (args) => <HeroWaitlistMotion {...args} onSubmit={undefined} />,
};
