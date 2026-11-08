import { CopyCommand } from "../../_site/copy-command";
import { installCommand } from "../../_site/links";
import { registriesSnippet } from "../../_site/prompts";
import { C, CodeBlock, DocsHeader, H2, P } from "../_ui";

export const metadata = {
  title: "Installation | Tapas UI",
  description: "Add Tapas UI sections to a Next.js project with the shadcn CLI.",
};

export default function Installation() {
  return (
    <article className="max-w-3xl space-y-8">
      <DocsHeader
        crumb="Getting started"
        title="Installation"
        lead="Tapas sections install with the shadcn CLI, so you need a project that already uses shadcn/ui."
      />
      <section aria-labelledby="step-1" className="space-y-4">
        <H2 id="step-1">1. Set up shadcn/ui</H2>
        <P>
          Skip this if your project already has a <C>components.json</C>. Otherwise run the shadcn init command in your
          Next.js app and pick your base color.
        </P>
        <CopyCommand command="npx shadcn@latest init" />
      </section>
      <section aria-labelledby="step-2" className="space-y-4">
        <H2 id="step-2">2. Add a section</H2>
        <P>
          Every section page shows its own command. This one adds the hero and the shadcn Badge and Button it uses.
        </P>
        <CopyCommand command={installCommand("hero")} />
      </section>
      <section aria-labelledby="step-3" className="space-y-4">
        <H2 id="step-3">3. Use it</H2>
        <P>
          The component lands in <C>components/custom/hero/</C>. Import it and pass your content as props.
        </P>
        <CodeBlock
          label="app/page.tsx"
          code={`import { Hero } from "@/components/custom/hero";

export default function Page() {
  return (
    <Hero
      title="Ship your landing page today"
      description="Copy the sections you need and make them yours."
      primaryAction={{ label: "Get started", href: "/signup" }}
    />
  );
}`}
        />
      </section>
      <section aria-labelledby="ai" className="space-y-4">
        <H2 id="ai">With an AI coding tool</H2>
        <P>
          Every section page has <strong>Copy AI prompt</strong>: paste it into Cursor, v0, Lovable or Claude Code and the
          tool installs the section and fills in your content. If your tool runs the shadcn MCP server, add the Tapas
          registry to <C>components.json</C> once, then ask for any section by name, such as <C>@tapas/pricing-table</C>.
        </P>
        <CodeBlock code={`{\n  ${registriesSnippet.replace(/\n/g, "\n  ")}\n}`} label="components.json" />
      </section>
      <section aria-labelledby="requirements" className="space-y-4">
        <H2 id="requirements">Requirements</H2>
        <P>
          React 19, Tailwind CSS v4 and shadcn/ui. The testimonial and blog cards use <C>next/image</C>, so they need
          Next.js; the other sections work in any React app with the shadcn setup.
        </P>
      </section>
    </article>
  );
}
