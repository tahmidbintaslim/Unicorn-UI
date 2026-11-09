import type { Metadata } from "next";

/** Title, description, canonical URL and share cards for one page, so shared links show that page. */
export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    // Setting openGraph here drops the root opengraph-image file, so point back at it.
    openGraph: { title, description, url: path, type: "website", siteName: "Tapas UI", images: "/opengraph-image.png" },
    twitter: { card: "summary_large_image", title, description, images: "/twitter-image.png" },
  };
}
