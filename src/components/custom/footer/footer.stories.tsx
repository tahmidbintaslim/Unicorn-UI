import type { Meta, StoryObj } from "@storybook/nextjs";
import { Footer } from "./footer";

const meta = {
  title: "Page sections/Footer",
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/gAmq9l9IOIKCbvxlWwGX4o/Tapas-UI---Sorbet-UI-%E2%80%94-Website-Design?node-id=6-126" } },
  component: Footer,
  args: {
    brand: "Acme",
    note: "© Acme. Sample content.",
    columns: [
      { title: "Product", links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }] },
      { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Blog", href: "#blog" }] },
      { title: "Legal", links: [{ label: "Privacy", href: "#privacy" }, { label: "Terms", href: "#terms" }] },
    ],
  },
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutNote: Story = { args: { note: undefined } };
