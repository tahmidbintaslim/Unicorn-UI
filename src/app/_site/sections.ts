import registry from "../../../registry.json";

export type SectionKind = "hero" | "block" | "card";

export interface SectionMeta {
  /** Registry item name; also the docs URL slug. */
  slug: string;
  title: string;
  description: string;
  kind: SectionKind;
  /** Registry name of the optional motion version, when one exists. */
  motionSlug?: string;
}

/** Display order within each kind; unlisted items go last in registry order. */
const ORDER = [
  "hero",
  "hero-split",
  "hero-command",
  "hero-spotlight",
  "hero-showcase",
  "hero-waitlist",
  "hero-marquee",
  "hero-video",
  "hero-theme-cycle",
  "hero-plates",
  "navbar",
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

const names = new Set(registry.items.map((item) => item.name));
const kindOf = (name: string): SectionKind =>
  name === "hero" || name.startsWith("hero-") ? "hero" : name.endsWith("-card") ? "card" : "block";
const rank = (name: string) => (ORDER.includes(name) ? ORDER.indexOf(name) : ORDER.length);

/**
 * Every plain registry item, read from registry.json so docs never drift from
 * it. `<name>-motion` items are folded into their plain item as `motionSlug`.
 */
export const SECTIONS: SectionMeta[] = registry.items
  .filter((item) => !item.name.endsWith("-motion"))
  .map((item) => ({
    slug: item.name,
    title: item.title,
    description: item.description,
    kind: kindOf(item.name),
    motionSlug: names.has(`${item.name}-motion`) ? `${item.name}-motion` : undefined,
  }))
  .sort((a, b) => rank(a.slug) - rank(b.slug));

export const getSection = (slug: string) => SECTIONS.find((s) => s.slug === slug);
