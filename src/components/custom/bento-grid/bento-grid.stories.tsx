import type { Meta, StoryObj } from "@storybook/nextjs";
import { Accessibility, Moon, Terminal, Zap } from "lucide-react";
import { BentoGrid } from "./bento-grid";

const meta = {
  title: "Page sections/Bento grid",
  component: BentoGrid,
  args: {
    title: "Why teams pick it",
    items: [
      { title: "One command", description: "Install any section with the shadcn CLI.", icon: Terminal, size: "large" },
      { title: "Fast", description: "Plain components, no runtime.", icon: Zap },
      { title: "Accessible", description: "Semantic markup and labels.", icon: Accessibility },
      { title: "Light and dark", description: "Uses your shadcn theme variables.", icon: Moon, size: "wide" },
    ],
  },
} satisfies Meta<typeof BentoGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const EqualTiles: Story = {
  args: {
    title: undefined,
    items: ["Plan", "Build", "Ship"].map((title) => ({ title, description: `${title} without leaving your editor.` })),
  },
};
