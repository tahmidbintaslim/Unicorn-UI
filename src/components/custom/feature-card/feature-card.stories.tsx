import type { Meta, StoryObj } from "@storybook/nextjs";
import { Copy } from "lucide-react";
import { FeatureCard } from "./feature-card";

const meta = {
  title: "Cards/Feature card",
  component: FeatureCard,
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-[26rem] p-8"><Story /></div>],
  args: {
    title: "Copy and paste",
    description: "Install with one command, then edit the code like any other file in your project.",
    icon: Copy,
    badge: "New",
    ctaText: "Learn more",
  },
} satisfies Meta<typeof FeatureCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};
export const Horizontal: Story = { args: { orientation: "horizontal" } };
export const WithoutButton: Story = { args: { ctaText: undefined, badge: undefined } };
