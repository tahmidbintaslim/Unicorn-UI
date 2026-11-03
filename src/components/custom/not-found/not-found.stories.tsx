import type { Meta, StoryObj } from "@storybook/nextjs";
import { NotFound } from "./not-found";

const meta = {
  title: "Utility/404 page",
  component: NotFound,
  args: { links: [{ label: "Read the docs", href: "#docs" }] },
} satisfies Meta<typeof NotFound>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
import { NotFoundMotion } from "./not-found-motion";
export const Motion: Story = { render: (args) => <NotFoundMotion {...args} /> };
