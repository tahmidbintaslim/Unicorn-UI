import type { Meta, StoryObj } from "@storybook/nextjs";
import { CtaBanner } from "./cta-banner";
import { CtaBannerMotion } from "./cta-banner-motion";

const meta = {
  title: "Page sections/CTA banner",
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/gAmq9l9IOIKCbvxlWwGX4o/Tapas-UI---Sorbet-UI-%E2%80%94-Website-Design?node-id=6-105" } },
  component: CtaBanner,
  args: {
    title: "Start building",
    description: "Copy a section and make it yours.",
    actionLabel: "Get started",
    actionHref: "#start",
  },
} satisfies Meta<typeof CtaBanner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutDescription: Story = { args: { description: undefined } };
export const Motion: Story = { render: (args) => <CtaBannerMotion {...args} /> };
