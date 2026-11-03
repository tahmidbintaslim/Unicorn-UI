import type { Meta, StoryObj } from "@storybook/nextjs";

import { Contact } from "./contact";

const meta = {
  title: "Company/Contact",
  component: Contact,
  args: { action: "#contact", details: [{ label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" }] },
} satisfies Meta<typeof Contact>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
