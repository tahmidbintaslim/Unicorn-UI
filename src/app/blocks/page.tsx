import { BentoGrid } from "@/components/custom/bento-grid";
import { CtaBanner } from "@/components/custom/cta-banner";
import { Faq } from "@/components/custom/faq";
import { Footer } from "@/components/custom/footer";
import { Hero } from "@/components/custom/hero";
import { LogoCloud } from "@/components/custom/logo-cloud";
import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Accessibility, Moon, Terminal, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CopyCommand } from "./copy-command";

export const metadata = {
  title: "Landing blocks | Tapas UI",
  description: "Hero, navbar, bento grid, logo cloud, FAQ, CTA and footer blocks for shadcn/ui. Install each with one command.",
};

const REGISTRY = "https://tapas-ui.vercel.app/r";

interface BlockDoc {
  name: string;
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
}

const blocks: BlockDoc[] = [
  {
    name: "navbar",
    title: "Navbar",
    description: "Brand, links and an action. On phones the links fold into a menu built on details/summary, so it needs no JavaScript.",
    preview: (
      <Navbar
        brand="Acme"
        links={[{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }, { label: "Docs", href: "#docs" }]}
        action={{ label: "Get started", href: "#start" }}
      />
    ),
    code: `<Navbar
  brand="Acme"
  links={[{ label: "Features", href: "/features" }, { label: "Pricing", href: "/pricing" }]}
  action={{ label: "Get started", href: "/signup" }}
/>`,
  },
  {
    name: "hero",
    title: "Hero",
    description: "Centered headline with an optional badge and up to two links.",
    preview: (
      <Hero
        eyebrow="New"
        title="Ship your landing page today"
        description="Copy the sections you need and make them yours."
        primaryAction={{ label: "Get started", href: "#start" }}
        secondaryAction={{ label: "Learn more", href: "#more" }}
      />
    ),
    code: `<Hero
  eyebrow="New"
  title="Ship your landing page today"
  description="Copy the sections you need and make them yours."
  primaryAction={{ label: "Get started", href: "/signup" }}
  secondaryAction={{ label: "Learn more", href: "/docs" }}
/>`,
  },
  {
    name: "logo-cloud",
    title: "Logo cloud",
    description: "A \"trusted by\" strip. Pass logos, or just names; names stay readable to screen readers either way.",
    preview: <LogoCloud logos={[{ name: "Acme" }, { name: "Globex" }, { name: "Initech" }, { name: "Umbrella" }]} />,
    code: `<LogoCloud logos={[{ name: "Acme" }, { name: "Globex", logo: <GlobexLogo /> }]} />`,
  },
  {
    name: "bento-grid",
    title: "Bento grid",
    description: "Feature tiles of mixed sizes (default, wide, tall, large). Tiles stack in one column on phones.",
    preview: (
      <BentoGrid
        title="Why teams pick it"
        items={[
          { title: "One command", description: "Install any block with the shadcn CLI.", icon: Terminal, size: "large" },
          { title: "Fast", description: "Plain components, no runtime.", icon: Zap },
          { title: "Accessible", description: "Semantic markup and labels.", icon: Accessibility },
          { title: "Light and dark", description: "Uses your shadcn theme variables.", icon: Moon, size: "wide" },
        ]}
      />
    ),
    code: `<BentoGrid
  title="Why teams pick it"
  items={[
    { title: "One command", description: "Install any block.", icon: Terminal, size: "large" },
    { title: "Fast", description: "Plain components.", icon: Zap },
  ]}
/>`,
  },
  {
    name: "faq",
    title: "FAQ",
    description: "Questions and answers on native details/summary, so it opens and closes without JavaScript.",
    preview: (
      <Faq
        items={[
          { question: "How do I install a block?", answer: "Run the install command shown above it." },
          { question: "Do blocks need JavaScript?", answer: "The FAQ and the navbar menu work without it." },
        ]}
      />
    ),
    code: `<Faq items={[{ question: "Is it free?", answer: "Yes, MIT licensed." }]} />`,
  },
  {
    name: "cta-banner",
    title: "CTA banner",
    description: "A full-width band with a heading, one line of text and one button.",
    preview: <CtaBanner title="Start building" description="Copy a block and make it yours." actionLabel="Get started" actionHref="#start" />,
    code: `<CtaBanner title="Start building" description="Copy a block and make it yours." actionLabel="Get started" actionHref="/signup" />`,
  },
  {
    name: "footer",
    title: "Footer",
    description: "Brand, link columns inside a labelled nav, and a small-print line.",
    preview: (
      <Footer
        brand="Acme"
        note="© Acme. Sample content."
        columns={[
          { title: "Product", links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }] },
          { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Blog", href: "#blog" }] },
        ]}
      />
    ),
    code: `<Footer
  brand="Acme"
  note="© Acme"
  columns={[{ title: "Product", links: [{ label: "Pricing", href: "/pricing" }] }]}
/>`,
  },
];

export default function BlocksPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft aria-hidden="true" className="mr-2 size-4" />
              Home
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/components">Cards</Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold">Landing blocks</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Seven sections for marketing pages. Each one installs with the shadcn CLI into a
          project that already has shadcn/ui set up, together with the primitives it needs.
        </p>
        <nav aria-label="Blocks" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {blocks.map((block) => (
              <li key={block.name}>
                <a href={`#${block.name}`} className="rounded-full border px-3 py-1 text-sm hover:bg-muted">
                  {block.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {blocks.map((block) => (
          <section key={block.name} id={block.name} aria-labelledby={`${block.name}-title`} className="mt-16 scroll-mt-6">
            <h2 id={`${block.name}-title`} className="text-2xl font-bold">
              {block.title}
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">{block.description}</p>
            <div className="mt-4">
              <CopyCommand command={`npx shadcn@latest add ${REGISTRY}/${block.name}.json`} />
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border">{block.preview}</div>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{block.code}</code>
            </pre>
          </section>
        ))}
      </main>
    </div>
  );
}
