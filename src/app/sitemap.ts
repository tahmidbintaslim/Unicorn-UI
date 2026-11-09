import type { MetadataRoute } from "next";
import { SECTIONS } from "./_site/sections";
import { TEMPLATES } from "./_site/templates";

const BASE = "https://tapasui.tahmid.space";

/** Public pages only; the fictional /examples demos stay out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/docs",
    "/docs/installation",
    "/docs/theming",
    "/docs/sections",
    "/templates",
    ...SECTIONS.map((s) => `/docs/sections/${s.slug}`),
    ...TEMPLATES.flatMap((t) => [`/templates/${t.slug}`, `/templates/${t.slug}/motion`]),
  ];
  return paths.map((p) => ({ url: `${BASE}${p}` }));
}
