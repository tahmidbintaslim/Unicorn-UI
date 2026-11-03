import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  // Stories live next to each section in src/components/custom/<name>/.
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-themes"],
  framework: { name: "@storybook/nextjs", options: {} },
  // Only the demo images: public/ also holds this Storybook build (public/storybook).
  staticDirs: [{ from: "../public/demo", to: "/demo" }],
};

export default config;
