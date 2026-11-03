import registry from "../../../registry.json";

export type SectionKind = "block" | "card";

export interface SectionMeta {
  /** Registry item name; also the docs URL slug. */
  slug: string;
  title: string;
  description: string;
  kind: SectionKind;
}

/** Display order: page sections top to bottom, then cards. */
const ORDER = [
  "navbar",
  "hero",
  "logo-cloud",
  "bento-grid",
  "faq",
  "cta-banner",
  "footer",
  "pricing-card",
  "testimonial-card",
  "feature-card",
  "statistics-card",
  "blog-card",
  "interactive-card",
];

/** Every registry item, read from registry.json so docs never drift from it. */
export const SECTIONS: SectionMeta[] = registry.items
  .map((item) => ({
    slug: item.name,
    title: item.title,
    description: item.description,
    kind: (item.name.endsWith("-card") ? "card" : "block") as SectionKind,
  }))
  .sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

export const getSection = (slug: string) => SECTIONS.find((s) => s.slug === slug);
