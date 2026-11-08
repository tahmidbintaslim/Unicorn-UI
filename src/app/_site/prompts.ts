import { REGISTRY_URL, SITE_URL, installCommand } from "./links";

/** Namespace for the shadcn registry, so agents and the CLI can say `@tapas/<name>`. */
export const REGISTRY_NAMESPACE = "@tapas";

/** components.json entry that maps @tapas/<name> to this registry. */
export const registriesSnippet = `"registries": {
  "${REGISTRY_NAMESPACE}": "${REGISTRY_URL}/{name}.json"
}`;

/** A ready-to-paste prompt for Cursor, v0, Lovable or Claude Code that adds one section. */
export function aiPrompt({ slug, title, usage }: { slug: string; title: string; usage?: string }) {
  const use = usage
    ? `Use it like this, then replace the sample copy with my product's real content:\n\n${usage}`
    : `Its props and usage are at ${SITE_URL}/docs/sections/${slug.replace(/-motion$/, "")}. Replace the sample copy with my product's real content.`;
  return `Add the Tapas UI "${title}" section to my Next.js + shadcn/ui project.

1. Install it: ${installCommand(slug)}
2. ${use}

Keep my shadcn theme tokens (primary, muted, card, border); don't add hard-coded colors.`;
}

/** Instruction for an agent that has the shadcn MCP server: register @tapas once, then add the item. */
export function mcpPrompt(slug: string) {
  return `Using the shadcn MCP server, add ${REGISTRY_NAMESPACE}/${slug} to this project.
If ${REGISTRY_NAMESPACE} isn't registered yet, first add this to components.json:

${registriesSnippet}`;
}
