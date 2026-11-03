import type { Meta, StoryObj } from "@storybook/nextjs";
import { sampleSteps } from "@/app/docs/_content-sections";
import { Steps } from "./steps";
import { StepsMotion } from "./steps-motion";

const meta = {
  title: "Features/Steps",
  component: Steps,
  args: { title: "How it works", steps: sampleSteps },
} satisfies Meta<typeof Steps>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <StepsMotion {...args} /> };
