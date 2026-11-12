import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "./copy-button";
import { installCommand } from "./links";
import { aiPrompt } from "./prompts";
import type { SectionMeta } from "./sections";

/**
 * Catalogue card: a real screenshot of the section, a title that links to its
 * docs (the link covers the card), and copy actions kept outside the link.
 */
export function SectionCard({ section: s, headingLevel: H = "h3" }: { section: SectionMeta; headingLevel?: "h2" | "h3" | "h4" }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-[border-color,translate,box-shadow] duration-300 focus-within:border-brand/60 hover:border-brand/50 motion-safe:hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_color-mix(in_oklch,var(--saffron)_45%,transparent)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b bg-white">
        {/* Decorative: the title below names the section. Regenerate with scripts/capture-previews.cjs. */}
        <Image
          src={`/previews/${s.slug}.jpg`}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-contain object-top transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <H className="flex items-center gap-2 font-semibold">
          <Link
            href={`/docs/sections/${s.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-brand"
          >
            {s.title}
          </Link>
          {s.motionSlug && <span className="rounded-full border border-brand/40 px-2 py-0.5 text-[11px] font-medium text-brand">Motion</span>}
        </H>
        <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
        {/* Above the stretched link, so the buttons stay clickable. */}
        <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-1">
          <CopyButton text={installCommand(s.slug)} label="Copy install" />
          <CopyButton text={aiPrompt({ slug: s.slug, title: s.title })} label="Copy AI prompt" />
        </div>
      </div>
    </article>
  );
}
