import type { Meta, StoryObj } from "@storybook/nextjs";
import { DemoScreen } from "@/app/docs/_content-heroes";
import { CtaSplit } from "./cta-split";
import { CtaSplitMotion } from "./cta-split-motion";

const meta = {
  title: "Marketing/CTA split",
  component: CtaSplit,
  args: {
    title: "Ready to see your own usage?",
    description: "Start free. Sample copy.",
    primaryAction: { label: "Start free", href: "#start" },
    secondaryAction: { label: "Talk to us", href: "#contact" },
    media: <DemoScreen />,
  },
} satisfies Meta<typeof CtaSplit>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <CtaSplitMotion {...args} /> };
