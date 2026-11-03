import type { Meta, StoryObj } from "@storybook/nextjs";
import { PricingCard } from "./pricing-card";

const meta = {
  title: "Cards/Pricing card",
  component: PricingCard,
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/gAmq9l9IOIKCbvxlWwGX4o/Tapas-UI---Sorbet-UI-%E2%80%94-Website-Design?node-id=6-69" },  layout: "centered" },
  decorators: [(Story) => <div className="w-80 p-8"><Story /></div>],
  args: {
    name: "Pro",
    description: "For growing teams",
    price: 19,
    features: [
      { text: "10 projects", included: true },
      { text: "Priority support", included: true },
      { text: "Custom domain", included: false },
    ],
    ctaText: "Start trial",
  },
} satisfies Meta<typeof PricingCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Popular: Story = { args: { popular: true } };
export const Yearly: Story = { args: { price: 190, period: "year", currency: "€" } };
