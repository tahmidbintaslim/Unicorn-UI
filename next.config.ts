import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old gallery pages moved into the docs; keep their links working.
  // Storybook is a static build in public/storybook; serve its index at /storybook.
  async rewrites() {
    return [{ source: "/storybook", destination: "/storybook/index.html" }];
  },
  async redirects() {
    return [
      { source: "/blocks", destination: "/docs/sections", permanent: true },
      { source: "/components", destination: "/docs/sections", permanent: true },
      { source: "/components/:slug", destination: "/docs/sections/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
