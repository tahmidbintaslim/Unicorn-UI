import type { Meta, StoryObj } from "@storybook/nextjs";
import { BlogCard } from "./blog-card";
import { BlogCardMotion } from "./blog-card-motion";

const meta = {
  title: "Cards/Blog card",
  component: BlogCard,
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-[26rem] p-8"><Story /></div>],
  args: {
    title: "Building a landing page in an afternoon",
    excerpt: "Pick the sections you need, install them with one command and spend the rest of the day on copy.",
    author: "Sarah Wilson",
    date: "2026-01-15",
    readTime: "5 min read",
    category: "Guide",
    image: "/demo/blog-cover.webp",
  },
} satisfies Meta<typeof BlogCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Horizontal: Story = {
  args: { variant: "horizontal" },
  decorators: [(Story) => <div className="w-[40rem] p-8"><Story /></div>],
};
export const Minimal: Story = { args: { variant: "minimal", image: undefined } };
export const Motion: Story = { render: (args) => <BlogCardMotion {...args} /> };
