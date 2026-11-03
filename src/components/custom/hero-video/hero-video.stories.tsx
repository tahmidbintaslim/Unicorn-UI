import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroVideo } from "./hero-video";
import { HeroVideoMotion } from "./hero-video-motion";

const meta = {
  title: "Heroes/Video",
  component: HeroVideo,
  args: { title: "See the product in 60 seconds", poster: "/demo/blog-cover.webp", posterAlt: "Product tour", videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
} satisfies Meta<typeof HeroVideo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithEyebrow: Story = { args: { eyebrow: "New" } };
export const Motion: Story = { render: (args) => <HeroVideoMotion {...args} /> };
