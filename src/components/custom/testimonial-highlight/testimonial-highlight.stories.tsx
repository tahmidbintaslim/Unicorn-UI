import type { Meta, StoryObj } from "@storybook/nextjs";

import { TestimonialHighlight } from "./testimonial-highlight";
import { TestimonialHighlightMotion } from "./testimonial-highlight-motion";

const meta = {
  title: "Proof/Testimonial highlight",
  component: TestimonialHighlight,
  args: { quote: "We replaced a week of landing-page work with an afternoon.", author: "Maya R.", role: "Founder", company: "Sample Co" },
} satisfies Meta<typeof TestimonialHighlight>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <TestimonialHighlightMotion {...args} /> };
