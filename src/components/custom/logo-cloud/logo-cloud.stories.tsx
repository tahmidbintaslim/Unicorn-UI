import type { Meta, StoryObj } from "@storybook/nextjs";
import { LogoCloud } from "./logo-cloud";

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
