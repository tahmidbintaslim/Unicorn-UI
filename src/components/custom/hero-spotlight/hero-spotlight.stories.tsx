import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroSpotlight } from "./hero-spotlight";
import { HeroSpotlightMotion } from "./hero-spotlight-motion";

const meta = {
  title: "Heroes/Spotlight",
  component: HeroSpotlight,
  args: { title: "Your product, under the spotlight", description: "A grid canvas and a glow. Sample copy.", primaryAction: { label: "Get started", href: "#start" } },
} satisfies Meta<typeof HeroSpotlight>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithEyebrow: Story = { args: { eyebrow: "New" } };
export const Motion: Story = { render: (args) => <HeroSpotlightMotion {...args} /> };
