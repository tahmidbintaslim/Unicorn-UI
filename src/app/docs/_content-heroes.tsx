import { HeroCommand, HeroCommandMotion } from "@/components/custom/hero-command";
import { HeroSplit, HeroSplitMotion } from "@/components/custom/hero-split";
import type { PropDoc, SectionDoc } from "./_content";

/** Sample product shot for hero previews: a fake chart, labelled as sample. */
export function DemoScreen() {
  return (
    <div role="img" aria-label="Sample dashboard chart" className="rounded-xl border bg-card p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Weekly active users</span>
        <span className="text-xs text-muted-foreground">Sample data</span>
      </div>
      <div className="mt-6 flex h-40 items-end gap-2">
        {[38, 52, 46, 70, 64, 88, 80, 100].map((h, i) => (
          <span key={i} className="flex-1 rounded-t-md bg-primary" style={{ height: `${h}%`, opacity: 0.35 + i * 0.08 }} />
        ))}
      </div>
    </div>
  );
}

const BASE_PROPS: PropDoc[] = [
  { name: "title", type: "string", required: true, description: "The headline, rendered as the page's h1." },
  { name: "eyebrow", type: "string", description: "Small badge above the title." },
  { name: "description", type: "string", description: "Supporting line under the title." },
  { name: "primaryAction", type: "{ label: string; href: string }", description: "Filled button." },
  { name: "secondaryAction", type: "{ label: string; href: string }", description: "Outline button." },
];
const ROOT: PropDoc = {
  name: "...props",
  type: `React.ComponentProps<"section">`,
  description: "Any other section attribute (id, aria-*, data-*, ref) goes to the root element.",
};

const split = {
  eyebrow: "New",
  title: "Know which features your users love",
  description: "Product analytics without the setup. Sample copy.",
  primaryAction: { label: "Start free", href: "#start" },
  secondaryAction: { label: "Book a demo", href: "#demo" },
};

const command = {
  title: "Install a section in one line",
  description: "Then edit it like any other file in your project.",
  command: "npx shadcn@latest add https://tapas-ui.vercel.app/r/hero.json",
  primaryAction: { label: "Read the docs", href: "#docs" },
};

export const HERO_DOCS: Record<string, SectionDoc> = {
  "hero-split": {
    preview: <HeroSplit {...split} media={<DemoScreen />} />,
    importLine: `import { HeroSplit } from "@/components/custom/hero-split";`,
    usage: `<HeroSplit
  title="Know which features your users love"
  description="Product analytics without the setup."
  primaryAction={{ label: "Start free", href: "/signup" }}
  media={<img src={screenshotUrl} alt="The dashboard" />}
  mediaPosition="right"
/>`,
    props: [
      ...BASE_PROPS,
      { name: "media", type: "ReactNode", required: true, description: "Image, video or component beside the copy." },
      { name: "mediaPosition", type: `"left" | "right"`, default: `"right"`, description: "Media side from the lg breakpoint. Phones always show the copy first." },
      ROOT,
    ],
    a11y: ["Give the media its own text alternative (alt text or an aria-label)."],
    motion: {
      summary: "The copy rises in, the media floats up and tilts a few degrees toward a mouse pointer. There is no tilt on touch screens.",
      preview: <HeroSplitMotion {...split} media={<DemoScreen />} />,
      importLine: `import { HeroSplitMotion } from "@/components/custom/hero-split/hero-split-motion";`,
      usage: `<HeroSplitMotion
  title="Know which features your users love"
  primaryAction={{ label: "Start free", href: "/signup" }}
  media={<img src={screenshotUrl} alt="The dashboard" />}
/>`,
    },
  },
  "hero-command": {
    preview: <HeroCommand {...command} />,
    importLine: `import { HeroCommand } from "@/components/custom/hero-command";`,
    usage: `<HeroCommand
  title="Install a section in one line"
  command="npx shadcn@latest add https://example.com/r/hero.json"
  primaryAction={{ label: "Read the docs", href: "/docs" }}
/>`,
    props: [
      ...BASE_PROPS.filter((p) => p.name !== "secondaryAction"),
      { name: "command", type: "string", required: true, description: "The command to show and copy." },
      { name: "copyLabel", type: "string", default: `"Copy command"`, description: "Accessible name of the copy button." },
      ROOT,
    ],
    a11y: ["The copy button announces “Copied” through a polite live region."],
    motion: {
      summary: "The command types itself, one character at a time, with a blinking caret. Screen readers and the copy button always get the full command.",
      preview: <HeroCommandMotion {...command} />,
      importLine: `import { HeroCommandMotion } from "@/components/custom/hero-command/hero-command-motion";`,
      usage: `<HeroCommandMotion
  title="Install a section in one line"
  command="npx shadcn@latest add https://example.com/r/hero.json"
/>`,
    },
  },
};
