import type { Meta, StoryObj } from "@storybook/nextjs";
import { NavbarFloating } from "./navbar-floating";

const meta = {
  title: "Utility/Navbar floating",
  component: NavbarFloating,
  args: { brand: "Acme", links: [{ label: "Product", href: "#product" }, { label: "Pricing", href: "#pricing" }], action: { label: "Sign up", href: "#signup" } },
} satisfies Meta<typeof NavbarFloating>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
import { NavbarFloatingMotion } from "./navbar-floating-motion";
export const Motion: Story = { render: (args) => <NavbarFloatingMotion {...args} /> };
