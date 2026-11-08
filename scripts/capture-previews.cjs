/* eslint-disable @typescript-eslint/no-require-imports -- plain Node script; require() resolves a globally installed Playwright via NODE_PATH */
// Screenshots each section's docs preview into public/previews/<slug>.jpg for the section cards.
// Usage: pnpm build && pnpm start, then: node scripts/capture-previews.cjs http://localhost:3000
// Needs Playwright with Chromium (installed globally, or `npm i -g playwright`; set NODE_PATH if needed).
const { chromium } = require("playwright");
const { readFileSync } = require("node:fs");

const base = process.argv[2] ?? "http://localhost:3000";
// Same filter as src/app/_site/sections.ts: plain sections only.
const slugs = JSON.parse(readFileSync("registry.json", "utf8"))
  .items.map((i) => i.name)
  .filter((n) => !n.endsWith("-motion") && !n.startsWith("template-") && n !== "motion-lift");

(async () => {
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, colorScheme: "light" });
await page.addInitScript(() => localStorage.setItem("theme", "light"));
for (const slug of slugs) {
  await page.goto(`${base}/docs/sections/${slug}`, { waitUntil: "networkidle" });
  const el = page.locator('section[aria-labelledby="preview"] .theme-demo').first();
  await el.scrollIntoViewIfNeeded();
  // Measure after scrolling: clip coordinates are relative to the viewport.
  const box = await el.boundingBox();
  if (!box) throw new Error(`no preview for ${slug}`);
  // Cards show the top of each section; cap the height to keep files small.
  await page.screenshot({
    path: `public/previews/${slug}.jpg`,
    type: "jpeg",
    quality: 72,
    clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, 720) },
  });
  console.log("captured", slug);
}
await browser.close();
})();
