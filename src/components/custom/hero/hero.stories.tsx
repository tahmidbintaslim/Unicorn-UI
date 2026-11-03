import type { Meta, StoryObj } from "@storybook/nextjs";
import { Hero } from "./hero";

const meta = {
  title: "Page sections/Hero",
  component: Hero,
  args: {
    eyebrow: "New",
    title: "Ship your landing page today",
    description: "Copy the sections you need and make them yours.",
    primaryAction: { label: "Get started", href: "#start" },
    secondaryAction: { label: "Learn more", href: "#more" },
  },
} satisfies Meta<typeof Hero>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TitleOnly: Story = {
  args: { eyebrow: undefined, description: undefined, primaryAction: undefined, secondaryAction: undefined },
};
export const OneAction: Story = { args: { secondaryAction: undefined } };
