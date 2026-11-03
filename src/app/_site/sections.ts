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
  /** Docs and sidebar group. */
  group: string;
}

/** Docs groups in sidebar order; each section belongs to exactly one. */
export const GROUPS: { name: string; slugs: string[] }[] = [
  { name: "Heroes", slugs: [] },
  { name: "Marketing", slugs: ["pricing-table", "comparison-table", "cta-banner", "cta-split", "newsletter"] },
  { name: "Proof", slugs: ["logo-cloud", "testimonials-wall", "testimonial-highlight", "stats-band", "social-proof"] },
  { name: "Features", slugs: ["feature-grid", "feature-rows", "bento-grid", "steps", "integrations-grid"] },
  { name: "Company", slugs: ["team", "blog-grid", "changelog", "faq", "faq-two-column", "contact"] },
  { name: "Navigation & utility", slugs: ["navbar", "navbar-floating", "announcement-bar", "footer", "footer-simple", "not-found", "coming-soon"] },
  { name: "Cards", slugs: [] },
];

const groupOf = (name: string, kind: SectionKind) =>
  kind === "hero" ? "Heroes" : kind === "card" ? "Cards" : (GROUPS.find((g) => g.slugs.includes(name))?.name ?? "Other");

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
  "pricing-table",
  "comparison-table",
  "cta-banner",
  "cta-split",
  "newsletter",
  "logo-cloud",
  "testimonials-wall",
  "testimonial-highlight",
  "stats-band",
  "social-proof",
  "feature-grid",
  "feature-rows",
  "bento-grid",
  "steps",
  "integrations-grid",
  "team",
  "blog-grid",
  "changelog",
  "faq",
  "faq-two-column",
  "contact",
  "navbar",
  "navbar-floating",
  "announcement-bar",
  "footer",
  "footer-simple",
  "not-found",
  "coming-soon",
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
    group: groupOf(item.name, kindOf(item.name)),
    motionSlug: names.has(`${item.name}-motion`) ? `${item.name}-motion` : undefined,
  }))
  .sort((a, b) => rank(a.slug) - rank(b.slug));

/** SECTIONS bucketed by GROUPS, in order; empty groups are dropped. */
export const GROUPED = GROUPS.map((g) => ({ name: g.name, items: SECTIONS.filter((s) => s.group === g.name) })).filter((g) => g.items.length > 0);

export const getSection = (slug: string) => SECTIONS.find((s) => s.slug === slug);
