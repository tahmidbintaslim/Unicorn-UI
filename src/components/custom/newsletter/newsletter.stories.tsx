import type { Meta, StoryObj } from "@storybook/nextjs";
import { Newsletter } from "./newsletter";
import { NewsletterMotion } from "./newsletter-motion";

const meta = {
  title: "Marketing/Newsletter",
  component: Newsletter,
  args: { title: "One email a month", description: "New sections and templates. Sample copy.", action: "#subscribe", note: "Unsubscribe anytime." },
} satisfies Meta<typeof Newsletter>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = {
  render: (args) => <NewsletterMotion {...args} onSubmit={() => new Promise((r) => setTimeout(r, 600))} />,
};
