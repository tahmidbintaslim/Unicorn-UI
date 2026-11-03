import type { Meta, StoryObj } from "@storybook/nextjs";
import { AnnouncementBar } from "./announcement-bar";

const meta = {
  title: "Utility/Announcement bar",
  component: AnnouncementBar,
  args: { message: "New: pricing tables and feature grids.", link: { label: "See what's new", href: "#changelog" }, dismissible: true },
} satisfies Meta<typeof AnnouncementBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
