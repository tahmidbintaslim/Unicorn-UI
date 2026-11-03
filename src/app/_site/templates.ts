import registry from "../../../registry.json";

export interface TemplateMeta {
  /** URL slug under /templates. */
  slug: string;
  /** Registry item name of the plain template; the motion one adds `-motion`. */
  registry: string;
  title: string;
  description: string;
  /** Plain section slugs the template is built from, for the gallery. */
  sections: string[];
}

const SLUGS = ["saas", "waitlist", "ai"] as const;

/** Free page templates, read from registry.json so the gallery never drifts from it. */
export const TEMPLATES: TemplateMeta[] = SLUGS.map((slug) => {
  const item = registry.items.find((i) => i.name === `template-${slug}`);
  if (!item) throw new Error(`registry.json is missing template-${slug}`);
  const deps = ("registryDependencies" in item ? item.registryDependencies : []) ?? [];
  return {
    slug,
    registry: item.name,
    title: item.title.replace(/^Template: /, ""),
    description: item.description,
    sections: deps.map((d) => d.replace(/^.*\/r\/(.*)\.json$/, "$1")),
  };
});

export const getTemplate = (slug: string) => TEMPLATES.find((t) => t.slug === slug);
