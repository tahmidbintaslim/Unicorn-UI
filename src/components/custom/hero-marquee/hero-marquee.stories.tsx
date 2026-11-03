import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroMarquee } from "./hero-marquee";
import { HeroMarqueeMotion } from "./hero-marquee-motion";

const meta = {
  title: "Heroes/Marquee",
  component: HeroMarquee,
  args: { title: "Used in projects of every size", items: ["Northwind", "Globex", "Initech", "Umbrella", "Hooli"].map((name) => ({ name })) },
} satisfies Meta<typeof HeroMarquee>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithEyebrow: Story = { args: { eyebrow: "New" } };
export const Motion: Story = { render: (args) => <HeroMarqueeMotion {...args} /> };
