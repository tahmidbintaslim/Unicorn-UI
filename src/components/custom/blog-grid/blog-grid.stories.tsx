import type { Meta, StoryObj } from "@storybook/nextjs";
import { samplePosts } from "@/app/docs/_content-sections";
import { BlogGrid } from "./blog-grid";

const meta = {
  title: "Company/Blog grid",
  component: BlogGrid,
  args: { title: "From the blog", posts: samplePosts, viewAll: { label: "All posts", href: "#blog" } },
} satisfies Meta<typeof BlogGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
import { BlogGridMotion } from "./blog-grid-motion";
export const Motion: Story = { render: (args) => <BlogGridMotion {...args} /> };
