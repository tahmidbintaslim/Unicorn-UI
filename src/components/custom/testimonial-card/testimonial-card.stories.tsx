import type { Meta, StoryObj } from "@storybook/nextjs";
import { TestimonialCard } from "./testimonial-card";

const meta = {
  title: "Cards/Testimonial card",
  component: TestimonialCard,
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/gAmq9l9IOIKCbvxlWwGX4o/Tapas-UI---Sorbet-UI-%E2%80%94-Website-Design?node-id=6-117" },  layout: "centered" },
  decorators: [(Story) => <div className="w-[26rem] p-8"><Story /></div>],
  args: {
    testimonial: "We swapped our hand-built landing page for Tapas sections in an afternoon. Sample quote.",
    author: "Sarah Johnson",
    role: "Product Manager",
    company: "Example Co",
    rating: 5,
    avatar: "/demo/avatar.webp",
  },
} satisfies Meta<typeof TestimonialCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Bordered: Story = { args: { variant: "bordered" } };
export const Elevated: Story = { args: { variant: "elevated" } };
export const WithoutAvatar: Story = { args: { avatar: undefined, rating: undefined } };
