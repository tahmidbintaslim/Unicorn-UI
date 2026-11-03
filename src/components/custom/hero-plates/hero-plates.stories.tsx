import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroPlates } from "./hero-plates";
import { HeroPlatesMotion } from "./hero-plates-motion";

const meta = {
  title: "Heroes/Plates",
  component: HeroPlates,
  args: { title: "A whole page, plate by plate", plates: ["Navbar", "Hero", "Pricing", "FAQ", "Footer"].map((label) => ({ label })) },
} satisfies Meta<typeof HeroPlates>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithEyebrow: Story = { args: { eyebrow: "New" } };
export const Motion: Story = { render: (args) => <HeroPlatesMotion {...args} /> };
