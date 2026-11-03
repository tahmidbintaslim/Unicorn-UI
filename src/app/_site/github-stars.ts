import { GITHUB_URL } from "./links";

const API = GITHUB_URL.replace("https://github.com/", "https://api.github.com/repos/");

/**
 * Live star count for the repo, cached for an hour by Next. Returns null when
 * GitHub is down or rate-limits us, so the button falls back to plain text.
 */
export async function getStarCount(): Promise<number | null> {
  try {
    const res = await fetch(API, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: unknown };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}
