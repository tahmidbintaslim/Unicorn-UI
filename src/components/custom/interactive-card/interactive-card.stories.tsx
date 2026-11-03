import type { Meta, StoryObj } from "@storybook/nextjs";
import { InteractiveCard } from "./interactive-card";

const meta = {
  title: "Cards/Interactive card",
  component: InteractiveCard,
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-80 p-8"><Story /></div>],
  args: {
    title: "Starter kit",
    description: "Everything you need to launch, in one card.",
    badge: "Popular",
    actionText: "Open",
    children: <p className="text-sm text-muted-foreground">Put any content here: a list, an image or a form.</p>,
  },
} satisfies Meta<typeof InteractiveCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoHover: Story = { args: { hoverEffect: false, badge: undefined } };
