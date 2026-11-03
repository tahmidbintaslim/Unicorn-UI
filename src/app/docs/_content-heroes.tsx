import { HeroCommand, HeroCommandMotion } from "@/components/custom/hero-command";
import { HeroShowcase, HeroShowcaseMotion } from "@/components/custom/hero-showcase";
import { HeroSplit, HeroSplitMotion } from "@/components/custom/hero-split";
import { HeroSpotlight, HeroSpotlightMotion } from "@/components/custom/hero-spotlight";
import { HeroWaitlist, HeroWaitlistMotion } from "@/components/custom/hero-waitlist";
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

const spotlight = {
  eyebrow: "Beta",
  title: "Your product, under the spotlight",
  description: "A grid canvas and a glow in your primary color. Sample copy.",
  primaryAction: { label: "Get started", href: "#start" },
  secondaryAction: { label: "See pricing", href: "#pricing" },
};

const showcase = {
  title: "See it working before you sign up",
  description: "Put a real, working component under the headline. Sample copy.",
  primaryAction: { label: "Try it free", href: "#try" },
};

const waitlist = {
  eyebrow: "Coming soon",
  title: "Be first in line",
  description: "Leave your email and we will write once, when it launches. Sample copy.",
  action: "#waitlist",
  note: "One email at launch. No spam.",
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
  "hero-spotlight": {
    preview: <HeroSpotlight {...spotlight} />,
    importLine: `import { HeroSpotlight } from "@/components/custom/hero-spotlight";`,
    usage: `<HeroSpotlight
  eyebrow="Beta"
  title="Your product, under the spotlight"
  primaryAction={{ label: "Get started", href: "/signup" }}
/>`,
    props: [...BASE_PROPS, ROOT],
    a11y: ["The grid and glow layers are decorative and hidden from screen readers.", "Text sits on the page background, so contrast is the same as your body text."],
    motion: {
      summary: "The glow follows the pointer across the grid and drifts back to center when it leaves.",
      preview: <HeroSpotlightMotion {...spotlight} />,
      importLine: `import { HeroSpotlightMotion } from "@/components/custom/hero-spotlight/hero-spotlight-motion";`,
      usage: `<HeroSpotlightMotion title="Your product, under the spotlight" />`,
    },
  },
  "hero-showcase": {
    preview: (
      <HeroShowcase {...showcase}>
        <DemoScreen />
      </HeroShowcase>
    ),
    importLine: `import { HeroShowcase } from "@/components/custom/hero-showcase";`,
    usage: `<HeroShowcase title="See it working" primaryAction={{ label: "Try it", href: "/try" }}>
  <YourLiveComponent />
</HeroShowcase>`,
    props: [
      ...BASE_PROPS,
      { name: "children", type: "ReactNode", required: true, description: "The live component shown in the frame." },
      ROOT,
    ],
    a11y: ["Whatever you put in the frame keeps its own semantics; the frame adds none."],
    motion: {
      summary: "The frame rises and scales into place after the headline, and lifts slightly on hover.",
      preview: (
        <HeroShowcaseMotion {...showcase}>
          <DemoScreen />
        </HeroShowcaseMotion>
      ),
      importLine: `import { HeroShowcaseMotion } from "@/components/custom/hero-showcase/hero-showcase-motion";`,
      usage: `<HeroShowcaseMotion title="See it working">
  <YourLiveComponent />
</HeroShowcaseMotion>`,
    },
  },
  "hero-waitlist": {
    preview: <HeroWaitlist {...waitlist} />,
    importLine: `import { HeroWaitlist } from "@/components/custom/hero-waitlist";`,
    usage: `<HeroWaitlist
  title="Be first in line"
  action="/api/waitlist"
  note="One email when we launch. No spam."
/>`,
    props: [
      ...BASE_PROPS.filter((p) => !p.name.endsWith("Action")),
      { name: "action", type: "string", required: true, description: "Where the form posts (your API route or a form service)." },
      { name: "method", type: `"post" | "get"`, default: `"post"`, description: "Form method." },
      { name: "inputLabel", type: "string", default: `"Email address"`, description: "Label for the email field (visually hidden)." },
      { name: "buttonLabel", type: "string", default: `"Join the waitlist"`, description: "Submit button text." },
      { name: "note", type: "string", description: "Small print under the form." },
      ROOT,
    ],
    a11y: ["The email field has a real label and uses type=\"email\" with autocomplete, so browsers validate and fill it."],
    motion: {
      summary: "The field glows on focus. With onSubmit, the button turns into “Sending…” and then the form morphs into a success message.",
      preview: <HeroWaitlistMotion {...waitlist} />,
      importLine: `import { HeroWaitlistMotion } from "@/components/custom/hero-waitlist/hero-waitlist-motion";`,
      usage: `<HeroWaitlistMotion
  title="Be first in line"
  action="/api/waitlist"
  onSubmit={async (email) => {
    await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) });
  }}
/>`,
      extraProps: [
        { name: "onSubmit", type: "(email: string) => Promise<void>", description: "Handle the signup yourself; shows sending, success and error states. Without it the form posts to action." },
      ],
    },
  },
};
