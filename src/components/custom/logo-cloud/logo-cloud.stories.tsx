import type { Meta, StoryObj } from "@storybook/nextjs";
import { LogoCloud } from "./logo-cloud";

const meta = {
  title: "Page sections/Logo cloud",
  component: LogoCloud,
  args: { logos: ["Acme", "Globex", "Initech", "Umbrella", "Hooli"].map((name) => ({ name })) },
} satisfies Meta<typeof LogoCloud>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Names: Story = {};
export const CustomTitle: Story = { args: { title: "Used in production by" } };
