import { HeroCommand, HeroCommandMotion } from "@/components/custom/hero-command";
import { HeroMarquee, HeroMarqueeMotion } from "@/components/custom/hero-marquee";
import { HeroPlates, HeroPlatesMotion } from "@/components/custom/hero-plates";
import { HeroShowcase, HeroShowcaseMotion } from "@/components/custom/hero-showcase";
import { HeroThemeCycle, HeroThemeCycleMotion } from "@/components/custom/hero-theme-cycle";
import { HeroVideo, HeroVideoMotion } from "@/components/custom/hero-video";
import { HeroSplit, HeroSplitMotion } from "@/components/custom/hero-split";
import { HeroShader, HeroShaderMotion } from "@/components/custom/hero-shader";
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
  command: "npx shadcn@latest add https://tapasui.tahmid.space/r/hero.json",
  primaryAction: { label: "Read the docs", href: "#docs" },
};

const shader = {
  eyebrow: "Beta",
  title: "A hero that moves like light on water",
  description: "A WebGL gradient in your primary color. Sample copy.",
  primaryAction: { label: "Get started", href: "#start" },
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

const marquee = {
  title: "Used in projects of every size",
  description: "Logos or names in an endless row. Sample names.",
  primaryAction: { label: "Get started", href: "#start" },
  items: ["Northwind", "Globex", "Initech", "Umbrella", "Hooli", "Stark", "Wayne"].map((name) => ({ name })),
};

// CC0 sample clip from MDN's examples; replace with your own video.
const video = {
  title: "See the product in 60 seconds",
  description: "A poster, a play button and your product tour. Sample copy.",
  poster: "/demo/blog-cover.webp",
  posterAlt: "Product tour",
  videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};

const cycle = {
  eyebrow: "Themeable",
  title: "Your theme, not ours",
  accentWord: "theme",
  description: "The accent word, badge and buttons follow --primary. Sample copy.",
  primaryAction: { label: "Get started", href: "#start" },
  secondaryAction: { label: "Theming docs", href: "#theming" },
};

const plates = {
  title: "A whole page, plate by plate",
  description: "Show what visitors get as a stack of sections. Sample copy.",
  primaryAction: { label: "Browse sections", href: "#sections" },
  plates: ["Navbar", "Hero", "Logo cloud", "Pricing", "FAQ", "Footer"].map((label) => ({ label })),
};

export const HERO_DOCS: Record<string, SectionDoc> = {
  "hero-split": {
    preview: <HeroSplit titleAs="h2" {...split} media={<DemoScreen />} />,
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
      preview: <HeroSplitMotion titleAs="h2" {...split} media={<DemoScreen />} />,
      importLine: `import { HeroSplitMotion } from "@/components/custom/hero-split/hero-split-motion";`,
      usage: `<HeroSplitMotion
  title="Know which features your users love"
  primaryAction={{ label: "Start free", href: "/signup" }}
  media={<img src={screenshotUrl} alt="The dashboard" />}
/>`,
    },
  },
  "hero-command": {
    preview: <HeroCommand titleAs="h2" {...command} />,
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
      preview: <HeroCommandMotion titleAs="h2" {...command} />,
      importLine: `import { HeroCommandMotion } from "@/components/custom/hero-command/hero-command-motion";`,
      usage: `<HeroCommandMotion
  title="Install a section in one line"
  command="npx shadcn@latest add https://example.com/r/hero.json"
/>`,
    },
  },
  "hero-spotlight": {
    preview: <HeroSpotlight titleAs="h2" {...spotlight} />,
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
      preview: <HeroSpotlightMotion titleAs="h2" {...spotlight} />,
      importLine: `import { HeroSpotlightMotion } from "@/components/custom/hero-spotlight/hero-spotlight-motion";`,
      usage: `<HeroSpotlightMotion title="Your product, under the spotlight" />`,
    },
  },
  "hero-shader": {
    preview: <HeroShader titleAs="h2" {...shader} />,
    importLine: `import { HeroShader } from "@/components/custom/hero-shader";`,
    usage: `<HeroShader
  eyebrow="Beta"
  title="A hero that moves like light on water"
  primaryAction={{ label: "Get started", href: "/signup" }}
/>`,
    props: [...BASE_PROPS, ROOT],
    a11y: ["The gradient and canvas are decorative and hidden from screen readers.", "Text sits on a light tint of your primary color, so check contrast if your primary is very light."],
    motion: {
      summary:
        "The gradient flows, painted with plain WebGL (no 3D library). It only draws while on screen, stops for reduced motion, has a Pause background button, and falls back to the CSS gradient where WebGL isn't available.",
      preview: <HeroShaderMotion titleAs="h2" {...shader} />,
      importLine: `import { HeroShaderMotion } from "@/components/custom/hero-shader/hero-shader-motion";`,
      usage: `<HeroShaderMotion title="A hero that moves like light on water" />`,
    },
  },
  "hero-showcase": {
    preview: (
      <HeroShowcase titleAs="h2" {...showcase}>
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
        <HeroShowcaseMotion titleAs="h2" {...showcase}>
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
    preview: <HeroWaitlist titleAs="h2" {...waitlist} />,
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
      { name: "honeypotName", type: "string", description: "Name of a hidden field only bots fill in. Your endpoint should drop submissions where it is not empty." },
      ROOT,
    ],
    a11y: ["The email field has a real label and uses type=\"email\" with autocomplete, so browsers validate and fill it."],
    motion: {
      summary: "The field glows on focus. With onSubmit, the button turns into “Sending…” and then the form morphs into a success message.",
      preview: <HeroWaitlistMotion titleAs="h2" {...waitlist} />,
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
  "hero-marquee": {
    preview: <HeroMarquee titleAs="h2" {...marquee} />,
    importLine: `import { HeroMarquee } from "@/components/custom/hero-marquee";`,
    usage: `<HeroMarquee
  title="Used in projects of every size"
  items={[{ name: "Acme" }, { name: "Globex", logo: <GlobexLogo /> }]}
/>`,
    props: [
      ...BASE_PROPS,
      { name: "items", type: "{ name: string; logo?: ReactNode }[]", required: true, description: "Logos or names. Names stay readable to screen readers when a logo is shown." },
      { name: "speed", type: "number", default: "30", description: "Seconds per full loop (motion version)." },
      ROOT,
    ],
    a11y: ["Items are a list, so screen readers announce how many there are."],
    motion: {
      summary: "The row scrolls endlessly. It pauses on hover, on keyboard focus and with the visible pause button.",
      preview: <HeroMarqueeMotion titleAs="h2" {...marquee} />,
      importLine: `import { HeroMarqueeMotion } from "@/components/custom/hero-marquee/hero-marquee-motion";`,
      usage: `<HeroMarqueeMotion title="Used in projects of every size" items={logos} speed={40} />`,
    },
  },
  "hero-video": {
    preview: <HeroVideo titleAs="h2" {...video} />,
    importLine: `import { HeroVideo } from "@/components/custom/hero-video";`,
    usage: `<HeroVideo
  title="See the product in 60 seconds"
  poster={tour.posterUrl}
  posterAlt="Product tour"
  videoSrc={tour.videoUrl}
  captionsSrc={tour.captionsUrl}
/>`,
    props: [
      ...BASE_PROPS,
      { name: "poster", type: "string", required: true, description: "Image shown before playback." },
      { name: "posterAlt", type: "string", required: true, description: "What the video shows; labels the video and play button." },
      { name: "videoSrc", type: "string", required: true, description: "Video file URL." },
      { name: "captionsSrc", type: "string", description: "WebVTT captions, added as a default English track." },
      ROOT,
    ],
    a11y: ["The video never autoplays and keeps native controls.", "Add captions with captionsSrc."],
    motion: {
      summary: "A poster with a play button; pressing it grows the poster into the player and starts the video.",
      preview: <HeroVideoMotion titleAs="h2" {...video} />,
      importLine: `import { HeroVideoMotion } from "@/components/custom/hero-video/hero-video-motion";`,
      usage: `<HeroVideoMotion title="See the product in 60 seconds" poster={tour.posterUrl} posterAlt="Product tour" videoSrc={tour.videoUrl} />`,
    },
  },
  "hero-theme-cycle": {
    preview: <HeroThemeCycle titleAs="h2" {...cycle} />,
    importLine: `import { HeroThemeCycle } from "@/components/custom/hero-theme-cycle";`,
    usage: `<HeroThemeCycle
  title="Your theme, not ours"
  accentWord="theme"
  primaryAction={{ label: "Get started", href: "/signup" }}
/>`,
    props: [
      ...BASE_PROPS,
      { name: "accentWord", type: "string", required: true, description: "Word in the title to color; ignored if the title doesn't contain it." },
      { name: "themes", type: "{ name; primary; primaryForeground }[]", default: "5 shadcn colors", description: "Themes the motion version cycles through." },
      { name: "interval", type: "number", default: "2500", description: "Milliseconds between themes (motion version)." },
      ROOT,
    ],
    a11y: ["The accent is color plus position, never color alone: the word is still part of the heading text."],
    motion: {
      summary: "The whole hero re-colors through a set of themes. It stops on hover, on focus and with the visible pause button.",
      preview: <HeroThemeCycleMotion titleAs="h2" {...cycle} />,
      importLine: `import { HeroThemeCycleMotion } from "@/components/custom/hero-theme-cycle/hero-theme-cycle-motion";`,
      usage: `<HeroThemeCycleMotion title="Your theme, not ours" accentWord="theme" interval={3000} />`,
    },
  },
  "hero-plates": {
    preview: <HeroPlates titleAs="h2" {...plates} />,
    importLine: `import { HeroPlates } from "@/components/custom/hero-plates";`,
    usage: `<HeroPlates
  title="A whole page, plate by plate"
  plates={[{ label: "Navbar" }, { label: "Hero" }, { label: "Pricing" }, { label: "Footer" }]}
/>`,
    props: [
      ...BASE_PROPS,
      { name: "plates", type: "{ label: string; content?: ReactNode }[]", required: true, description: "The parts of the page, top to bottom. 3 to 6 read best." },
      ROOT,
    ],
    a11y: ["Plates are a list in reading order."],
    motion: {
      summary: "As the section scrolls into view, the plates slide in from alternating sides and settle into a page.",
      preview: <HeroPlatesMotion titleAs="h2" {...plates} />,
      importLine: `import { HeroPlatesMotion } from "@/components/custom/hero-plates/hero-plates-motion";`,
      usage: `<HeroPlatesMotion title="A whole page, plate by plate" plates={plates} />`,
    },
  },
};
