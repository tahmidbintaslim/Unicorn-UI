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

/** The component's real source, read at build time so the Code tab never drifts. */
function readSource(slug: string) {
  return readFileSync(join(process.cwd(), "src", "components", "custom", slug, `${slug}.tsx`), "utf8");
}

const TOC = [
  { id: "preview", label: "Preview" },
  { id: "installation", label: "Installation" },
  { id: "usage", label: "Usage" },
  { id: "props", label: "Props" },
  { id: "accessibility", label: "Accessibility" },
];

export default async function SectionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const section = getSection(slug);
  const doc = DOCS[slug];
  if (!section || !doc) notFound();
  const source = readSource(slug);

  return (
    <div className="flex gap-10">
      <article className="min-w-0 flex-1 space-y-8">
        <DocsHeader
          crumb={section.kind === "card" ? "Cards" : "Page sections"}
          title={section.title}
          lead={section.description}
        />

        <section aria-labelledby="preview" className="theme-showcase space-y-3">
          <h2 id="preview" className="sr-only">
            Preview
          </h2>
          <Tabs defaultValue="preview">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <fieldset className="flex items-center gap-2">
                <legend className="sr-only">Preview theme color</legend>
                <span aria-hidden="true" className="text-[13px] text-muted-foreground">
                  Theme
                </span>
                <ThemeSwatches name={`theme-${slug}`} defaultValue="zinc" />
              </fieldset>
            </div>
            <TabsContent value="preview" className="mt-3">
              <div
                className={
                  doc.narrow
                    ? "theme-demo flex justify-center rounded-xl border bg-background px-4 py-12 sm:px-10"
                    : "theme-demo overflow-hidden rounded-xl border bg-background"
                }
              >
                {doc.preview}
              </div>
            </TabsContent>
            <TabsContent value="code" className="mt-3">
              <CodeBlock code={source} label={`components/custom/${slug}/${slug}.tsx`} />
            </TabsContent>
          </Tabs>
        </section>

        <section aria-labelledby="installation" className="space-y-4">
          <H2 id="installation">Installation</H2>
          <P>Run this in a project that already uses shadcn/ui. It adds the component and anything it needs.</P>
          <CopyCommand command={installCommand(slug)} />
        </section>

        <section aria-labelledby="usage" className="space-y-4">
          <H2 id="usage">Usage</H2>
          <CodeBlock code={`${doc.importLine}\n\n${doc.usage}`} />
        </section>

        <section aria-labelledby="props" className="space-y-4">
          <H2 id="props">Props</H2>
          <PropsTable rows={doc.props} />
        </section>

        <section aria-labelledby="accessibility" className="space-y-4">
          <H2 id="accessibility">Accessibility</H2>
          <ul className="max-w-[68ch] list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-brand">
            {doc.a11y.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      </article>
      <Toc items={TOC} />
    </div>
  );
}
