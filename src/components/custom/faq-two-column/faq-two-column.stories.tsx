import type { Meta, StoryObj } from "@storybook/nextjs";

import { FaqTwoColumn } from "./faq-two-column";

const meta = {
  title: "Company/FAQ two column",
  component: FaqTwoColumn,
  args: { contact: { label: "Email us", href: "#contact" }, items: [{ question: "Is it free?", answer: "Yes." }, { question: "Do I need a package?", answer: "No." }] },
} satisfies Meta<typeof FaqTwoColumn>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
