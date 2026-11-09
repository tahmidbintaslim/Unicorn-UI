import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/examples/"] },
    sitemap: "https://tapasui.tahmid.space/sitemap.xml",
  };
}
