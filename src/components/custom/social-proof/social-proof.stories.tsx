import type { Meta, StoryObj } from "@storybook/nextjs";

import { SocialProof } from "./social-proof";
import { SocialProofMotion } from "./social-proof-motion";

const meta = {
  title: "Proof/Social proof",
  component: SocialProof,
  args: { text: "Joined by 300 indie teams (sample)", rating: 4.8, people: ["Ana", "Ben", "Cy", "Dee"].map((name) => ({ name })) },
} satisfies Meta<typeof SocialProof>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <SocialProofMotion {...args} /> };
