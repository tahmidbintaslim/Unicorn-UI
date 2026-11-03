import type { Meta, StoryObj } from "@storybook/nextjs";
import { Navbar } from "./navbar";

const meta = {
  title: "Page sections/Navbar",
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/gAmq9l9IOIKCbvxlWwGX4o/Tapas-UI---Sorbet-UI-%E2%80%94-Website-Design?node-id=6-54" } },
  component: Navbar,
  args: {
    brand: "Acme",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Docs", href: "#docs" },
    ],
    action: { label: "Get started", href: "#start" },
  },
} satisfies Meta<typeof Navbar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutAction: Story = { args: { action: undefined } };
export const Phone: Story = { globals: { viewport: { value: "mobile1" } } };
