import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "../src/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    // Fail the a11y panel loudly rather than just listing issues.
    a11y: { test: "error" },
  },
  decorators: [
    // Light/dark toolbar switch; sections read the same .dark tokens as the site.
    withThemeByClassName({ themes: { light: "light", dark: "dark" }, defaultTheme: "light" }),
    (Story) => (
      <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
