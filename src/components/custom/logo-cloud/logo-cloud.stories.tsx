import type { Meta, StoryObj } from "@storybook/nextjs";
import { LogoCloud } from "./logo-cloud";
import { LogoCloudMotion } from "./logo-cloud-motion";

const meta = {
  title: "Page sections/Logo cloud",
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/gAmq9l9IOIKCbvxlWwGX4o/Tapas-UI---Sorbet-UI-%E2%80%94-Website-Design?node-id=6-110" } },
  component: LogoCloud,
  args: { logos: ["Acme", "Globex", "Initech", "Umbrella", "Hooli"].map((name) => ({ name })) },
} satisfies Meta<typeof LogoCloud>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Names: Story = {};
export const CustomTitle: Story = { args: { title: "Used in production by" } };
export const Motion: Story = { render: (args) => <LogoCloudMotion {...args} /> };
