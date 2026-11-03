import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old gallery pages moved into the docs; keep their links working.
  async redirects() {
    return [
      // Storybook is a static build in public/storybook. Its assets are relative
      // (./sb-manager/...), so /storybook must become a URL inside that folder:
      // Next strips trailing slashes, and a rewrite would resolve them at the root.
      { source: "/storybook", destination: "/storybook/index.html", permanent: false },
      { source: "/blocks", destination: "/docs/sections", permanent: true },
      { source: "/components", destination: "/docs/sections", permanent: true },
      { source: "/components/:slug", destination: "/docs/sections/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
