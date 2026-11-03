import type { Meta, StoryObj } from "@storybook/nextjs";
import { Hero } from "./hero";
import { HeroMotion } from "./hero-motion";

const meta = {
  title: "Heroes/Centered",
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/gAmq9l9IOIKCbvxlWwGX4o/Tapas-UI---Sorbet-UI-%E2%80%94-Website-Design?node-id=2-30" } },
  component: Hero,
  args: {
    eyebrow: "New",
    title: "Ship your landing page today",
    description: "Copy the sections you need and make them yours.",
    primaryAction: { label: "Get started", href: "#start" },
    secondaryAction: { label: "Learn more", href: "#more" },
  },
} satisfies Meta<typeof Hero>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TitleOnly: Story = {
  args: { eyebrow: undefined, description: undefined, primaryAction: undefined, secondaryAction: undefined },
};
export const OneAction: Story = { args: { secondaryAction: undefined } };
export const Motion: Story = { render: (args) => <HeroMotion {...args} /> };
