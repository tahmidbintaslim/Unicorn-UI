import { C, CodeBlock, DocsHeader, H2, P } from "../_ui";

export const metadata = {
  title: "Theming | Tapas UI",
  description: "Tapas UI sections use your shadcn theme variables for color, radius and dark mode.",
};

export default function Theming() {
  return (
    <article className="max-w-3xl space-y-8">
      <DocsHeader
        crumb="Getting started"
        title="Theming"
        lead="Tapas sections have no theme of their own. They read the CSS variables shadcn/ui puts in your globals.css, so changing your theme changes every section."
      />
      <section aria-labelledby="colors" className="space-y-4">
        <H2 id="colors">Colors</H2>
        <P>
          Buttons, badges and highlights use <C>--primary</C> and <C>--primary-foreground</C>. Supporting text and
          surfaces use <C>--muted</C>, <C>--muted-foreground</C>, <C>--card</C> and <C>--border</C>. Change them and
          every section follows. The swatches on each section page do exactly this, scoped to the preview.
        </P>
        <CodeBlock
          label="app/globals.css"
          code={`:root {
  --primary: oklch(0.546 0.245 262.881);
  --primary-foreground: oklch(0.97 0.014 254.604);
  --radius: 0.75rem;
}`}
        />
      </section>
      <section aria-labelledby="dark" className="space-y-4">
        <H2 id="dark">Dark mode</H2>
        <P>
          Sections use the same variables in dark mode, so whatever you define under <C>.dark</C> applies. Pair it with
          a theme switcher such as next-themes.
        </P>
      </section>
      <section aria-labelledby="radius" className="space-y-4">
        <H2 id="radius">Radius and spacing</H2>
        <P>
          Corners come from <C>--radius</C> through the shadcn Card and Button. Spacing uses Tailwind classes in the
          component file; since the code is yours, edit them directly.
        </P>
      </section>
    </article>
  );
}
