/** Site-wide URLs, kept in one place so renames touch one file. */
export const SITE_URL = "https://tapas-ui.vercel.app";
export const REGISTRY_URL = `${SITE_URL}/r`;
export const GITHUB_URL = "https://github.com/tahmidbintaslim/tapas-ui";
export const GOOD_FIRST_ISSUES_URL = `${GITHUB_URL}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22`;
export const CONTRIBUTING_URL = `${GITHUB_URL}/blob/main/CONTRIBUTING.md`;

/** The shadcn CLI command that installs one registry item. */
export const installCommand = (slug: string) =>
  `npx shadcn@latest add ${REGISTRY_URL}/${slug}.json`;
