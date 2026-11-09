import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroShader } from "./hero-shader";
import { HeroShaderMotion } from "./hero-shader-motion";

const meta = {
  title: "Heroes/Shader",
  component: HeroShader,
  args: { title: "A hero that moves like light on water", description: "A WebGL gradient in your primary color. Sample copy.", primaryAction: { label: "Get started", href: "#start" } },
} satisfies Meta<typeof HeroShader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithEyebrow: Story = { args: { eyebrow: "New" } };
export const Motion: Story = { render: (args) => <HeroShaderMotion {...args} /> };
