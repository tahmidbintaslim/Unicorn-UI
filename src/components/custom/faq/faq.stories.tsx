import type { Meta, StoryObj } from "@storybook/nextjs";
import { Faq } from "./faq";

const meta = {
  title: "Page sections/FAQ",
  component: Faq,
  args: {
    items: [
      { question: "Is it free?", answer: "Yes. MIT licensed, for personal and commercial projects." },
      { question: "Do I need to install a package?", answer: "No. The shadcn CLI copies the component into your project." },
      { question: "Does it work with my theme?", answer: "Yes. It uses your shadcn theme variables." },
    ],
  },
} satisfies Meta<typeof Faq>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomTitle: Story = { args: { title: "Questions before you start" } };
