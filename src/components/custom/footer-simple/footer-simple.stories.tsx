import type { Meta, StoryObj } from "@storybook/nextjs";
import { FooterSimple } from "./footer-simple";

const meta = {
  title: "Utility/Footer simple",
  component: FooterSimple,
  args: { brand: "Acme", note: "© Acme", links: [{ label: "Privacy", href: "#privacy" }, { label: "Terms", href: "#terms" }] },
} satisfies Meta<typeof FooterSimple>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
