import type { Meta, StoryObj } from "@storybook/nextjs";
import { sampleQuotes } from "@/app/docs/_content-sections";
import { TestimonialsWall } from "./testimonials-wall";
import { TestimonialsWallMotion } from "./testimonials-wall-motion";

const meta = {
  title: "Proof/Testimonials wall",
  component: TestimonialsWall,
  args: { title: "What builders say", items: sampleQuotes },
} satisfies Meta<typeof TestimonialsWall>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <TestimonialsWallMotion {...args} /> };
