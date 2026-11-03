import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroThemeCycle } from "./hero-theme-cycle";
import { HeroThemeCycleMotion } from "./hero-theme-cycle-motion";

const meta = {
  title: "Heroes/Theme cycle",
  component: HeroThemeCycle,
  args: { title: "Your theme, not ours", accentWord: "theme", primaryAction: { label: "Get started", href: "#start" } },
} satisfies Meta<typeof HeroThemeCycle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithEyebrow: Story = { args: { eyebrow: "New" } };
export const Motion: Story = { render: (args) => <HeroThemeCycleMotion {...args} /> };
