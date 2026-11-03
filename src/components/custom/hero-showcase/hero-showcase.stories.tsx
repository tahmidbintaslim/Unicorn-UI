import type { Meta, StoryObj } from "@storybook/nextjs";
import { DemoScreen } from "@/app/docs/_content-heroes";
import { HeroShowcase } from "./hero-showcase";
import { HeroShowcaseMotion } from "./hero-showcase-motion";

const meta = {
  title: "Heroes/Showcase",
  component: HeroShowcase,
  args: {
    title: "See it working before you sign up",
    description: "Put a real, working component under the headline. Sample copy.",
    primaryAction: { label: "Try it free", href: "#try" },
    children: <DemoScreen />,
  },
} satisfies Meta<typeof HeroShowcase>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithEyebrow: Story = { args: { eyebrow: "Live demo" } };
export const Motion: Story = { render: (args) => <HeroShowcaseMotion {...args} /> };
