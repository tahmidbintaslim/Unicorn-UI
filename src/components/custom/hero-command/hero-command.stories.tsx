import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroCommand } from "./hero-command";
import { HeroCommandMotion } from "./hero-command-motion";

const meta = {
  title: "Heroes/Command",
  component: HeroCommand,
  args: {
    title: "Install a section in one line",
    description: "Then edit it like any other file in your project.",
    command: "npx shadcn@latest add https://tapasui.tahmid.space/r/hero.json",
    primaryAction: { label: "Read the docs", href: "#docs" },
  },
} satisfies Meta<typeof HeroCommand>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithEyebrow: Story = { args: { eyebrow: "CLI" } };
export const Motion: Story = { render: (args) => <HeroCommandMotion {...args} /> };
