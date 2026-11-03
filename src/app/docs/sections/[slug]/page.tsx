import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CopyCommand } from "../../../_site/copy-command";
import { installCommand } from "../../../_site/links";
import { SECTIONS, getSection } from "../../../_site/sections";
import { ThemeSwatches } from "../../../_site/theme-swatches";
import { DOCS } from "../../_content";
import { CodeBlock, DocsHeader, H2, P, PropsTable, Toc } from "../../_ui";
import { MotionPreview } from "../../_motion-preview";
import { VariantSwitch } from "../../_variant-switch";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const section = getSection((await params).slug);
  if (!section) return {};
  return {
    title: `${section.title} | Tapas UI`,
    description: `${section.description} Install with one shadcn CLI command.`,
  };
}

/** A component's real source, read at build time so the Code tab never drifts. */
function readSource(folder: string, file: string) {
  return readFileSync(join(process.cwd(), "src", "components", "custom", folder, `${file}.tsx`), "utf8");
}

const TOC = [
  { id: "preview", label: "Preview" },
  { id: "installation", label: "Installation" },
  { id: "usage", label: "Usage" },
  { id: "props", label: "Props" },
  { id: "accessibility", label: "Accessibility" },
];

const CRUMB = { hero: "Heroes", block: "Page sections", card: "Cards" } as const;

/** Renders the plain block, plus the motion block when the section has one. */
function Variants({ plain, motion }: { plain: React.ReactNode; motion?: React.ReactNode }) {
  if (!motion) return <>{plain}</>;
  return (
    <>
      <div data-variant="plain">{plain}</div>
      <div data-variant="motion">{motion}</div>
    </>
  );
}

export default async function SectionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const section = getSection(slug);
  const doc = DOCS[slug];
  if (!section || !doc) notFound();
  const motion = section.motionSlug ? doc.motion : undefined;
  const source = readSource(slug, slug);
  const motionSource = motion && section.motionSlug ? readSource(slug, section.motionSlug) : undefined;
  const previewClass = doc.narrow
    ? "theme-demo flex justify-center rounded-xl border bg-background px-4 py-12 sm:px-10"
    : "theme-demo overflow-hidden rounded-xl border bg-background";

  return (
    <div className="flex gap-10">
      <article className="variant-scope min-w-0 flex-1 space-y-8">
        <DocsHeader crumb={CRUMB[section.kind]} title={section.title} lead={section.description} />

        <section aria-labelledby="preview" className="theme-showcase space-y-3">
          <h2 id="preview" className="sr-only">
            Preview
          </h2>
          <Tabs defaultValue="preview">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                {motion && <VariantSwitch name={`variant-${slug}`} />}
              </div>
              <fieldset className="flex items-center gap-2">
                <legend className="sr-only">Preview theme color</legend>
                <span aria-hidden="true" className="text-[13px] text-muted-foreground">
                  Theme
                </span>
                <ThemeSwatches name={`theme-${slug}`} defaultValue="zinc" />
              </fieldset>
            </div>
            {motion && (
              <p data-variant="motion" className="mt-3 text-sm text-muted-foreground">
                {motion.summary} With reduced motion turned on, it renders the plain layout.
              </p>
            )}
            <TabsContent value="preview" className="mt-3">
              <Variants
                plain={<div className={previewClass}>{doc.preview}</div>}
                motion={motion && <MotionPreview><div className={previewClass}>{motion.preview}</div></MotionPreview>}
              />
            </TabsContent>
            <TabsContent value="code" className="mt-3">
              <Variants
                plain={<CodeBlock code={source} label={`components/custom/${slug}/${slug}.tsx`} />}
                motion={
                  motionSource && (
                    <CodeBlock code={motionSource} label={`components/custom/${slug}/${section.motionSlug}.tsx`} />
                  )
                }
              />
            </TabsContent>
          </Tabs>
        </section>

        <section aria-labelledby="installation" className="space-y-4">
          <H2 id="installation">Installation</H2>
          <P>
            Run this in a project that already uses shadcn/ui. It adds the component and anything it needs
            {motion ? "; the motion version also adds the plain one and the motion package." : "."}
          </P>
          <Variants
            plain={<CopyCommand command={installCommand(slug)} />}
            motion={motion && section.motionSlug && <CopyCommand command={installCommand(section.motionSlug)} />}
          />
        </section>

        <section aria-labelledby="usage" className="space-y-4">
          <H2 id="usage">Usage</H2>
          <Variants
            plain={<CodeBlock code={`${doc.importLine}\n\n${doc.usage}`} />}
            motion={motion && <CodeBlock code={`${motion.importLine}\n\n${motion.usage}`} />}
          />
        </section>

        <section aria-labelledby="props" className="space-y-4">
          <H2 id="props">Props</H2>
          <Variants
            plain={<PropsTable rows={doc.props} />}
            motion={motion && <PropsTable rows={[...doc.props, ...(motion.extraProps ?? [])]} />}
          />
        </section>

        <section aria-labelledby="accessibility" className="space-y-4">
          <H2 id="accessibility">Accessibility</H2>
          <ul className="max-w-[68ch] list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-brand">
            {doc.a11y.map((note) => (
              <li key={note}>{note}</li>
            ))}
            {motion && <li>The motion version follows the visitor&apos;s reduced-motion setting and never hides content before it animates.</li>}
          </ul>
        </section>
      </article>
      <Toc items={TOC} />
    </div>
  );
}
