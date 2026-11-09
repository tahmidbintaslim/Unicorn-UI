import { pageMeta } from "@/app/_site/meta";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SECTIONS } from "../_site/sections";
import { C, DocsHeader, H2, P } from "./_ui";

export const metadata = pageMeta("Introduction | Tapas UI", "Tapas UI is a free, open-source set of landing-page sections for Next.js and shadcn/ui.", "/docs");

const NEXT = [
  { href: "/docs/installation", title: "Installation", body: "Set up shadcn/ui and add your first section." },
  { href: "/docs/theming", title: "Theming", body: "How sections pick up your colors, radius and dark mode." },
  { href: "/docs/sections", title: "Browse sections", body: `All ${SECTIONS.length} sections and cards with previews.` },
];

export default function DocsIntro() {
  return (
    <article className="max-w-3xl space-y-8">
      <DocsHeader
        title="Introduction"
        lead="Tapas UI is a free, open-source collection of landing-page sections for Next.js and shadcn/ui. You install a section with one command, and its code lands in your project for you to own and edit."
      />
      <section aria-labelledby="how" className="space-y-4">
        <H2 id="how">How it works</H2>
        <P>
          Each section is an item in a shadcn registry. Running <C>npx shadcn@latest add</C> with its URL copies the
          component into <C>components/custom/</C> and installs what it depends on, such as the shadcn Button or
          lucide-react. There is no Tapas package in <C>node_modules</C> and nothing to keep updated.
        </P>
      </section>
      <section aria-labelledby="principles" className="space-y-4">
        <H2 id="principles">What every section follows</H2>
        <ul className="max-w-[68ch] list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-brand">
          <li>
            It uses your shadcn theme variables (<C>--primary</C>, <C>--muted</C>, <C>--radius</C>), so it matches the rest
            of your app.
          </li>
          <li>It renders as a React Server Component. Only interactive parts are client components.</li>
          <li>It uses semantic HTML with keyboard and screen-reader support, checked in light and dark.</li>
          <li>It takes its content as props, so you can keep copy in one place.</li>
        </ul>
      </section>
      <section aria-labelledby="next" className="space-y-4">
        <H2 id="next">Next steps</H2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {NEXT.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-1.5 rounded-xl border bg-card p-4 transition-colors hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="flex items-center justify-between font-semibold">
                  {item.title}
                  <ArrowRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="text-sm text-muted-foreground">{item.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
