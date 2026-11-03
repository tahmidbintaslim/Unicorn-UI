import type { Meta, StoryObj } from "@storybook/nextjs";
import { DollarSign, Users } from "lucide-react";
import { StatisticsCard } from "./statistics-card";

const meta = {
  title: "Cards/Statistics card",
  component: StatisticsCard,
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-80 p-8"><Story /></div>],
  args: { title: "Monthly active users", value: "125,430", change: 12.5, changePeriod: "vs last month", icon: Users },
} satisfies Meta<typeof StatisticsCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const TrendingUp: Story = {};
export const TrendingDown: Story = { args: { title: "Revenue", value: "48.2k", prefix: "$", change: -4.1, icon: DollarSign } };
export const Flat: Story = { args: { change: 0 } };
