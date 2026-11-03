import type { Meta, StoryObj } from "@storybook/nextjs";
import { CtaBanner } from "./cta-banner";

const meta = {
  title: "Page sections/CTA banner",
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
