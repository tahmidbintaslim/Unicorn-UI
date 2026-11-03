import type { Meta, StoryObj } from "@storybook/nextjs";
import { DemoScreen } from "@/app/docs/_content-heroes";
import { HeroSplit } from "./hero-split";
import { HeroSplitMotion } from "./hero-split-motion";

const meta = {
  title: "Heroes/Split",
  component: HeroSplit,
  args: {
    eyebrow: "New",
    title: "Know which features your users love",
    description: "Product analytics without the setup. Sample copy.",
    primaryAction: { label: "Start free", href: "#start" },
    secondaryAction: { label: "Book a demo", href: "#demo" },
    media: <DemoScreen />,
  },
} satisfies Meta<typeof HeroSplit>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const MediaLeft: Story = { args: { mediaPosition: "left" } };
export const Motion: Story = { render: (args) => <HeroSplitMotion {...args} /> };
