import { CtaBanner } from "@/components/custom/cta-banner";
import { Faq } from "@/components/custom/faq";
import { Footer } from "@/components/custom/footer";
import { LogoCloud } from "@/components/custom/logo-cloud";
import { Hero } from "@/components/custom/hero";


export const metadata = { title: "Landing blocks | Tapas UI" };

export default function BlocksPage() {
  return (
    <main className="container mx-auto px-4">
      <Hero
        eyebrow="New"
        title="Landing blocks you install with one command"
        description="Hero, FAQ and call-to-action sections for marketing pages."
        primaryAction={{ label: "Browse cards", href: "/components" }}
        secondaryAction={{ label: "View source", href: "https://github.com/tahmidbintaslim/tapas-ui" }}
      />
      <LogoCloud logos={[{ name: "Acme" }, { name: "Globex" }, { name: "Initech" }, { name: "Umbrella" }]} />
      <Faq
        items={[
          { question: "How do I install a block?", answer: "Run npx shadcn@latest add with the block's /r/<name>.json URL." },
          { question: "Do they need JavaScript?", answer: "The FAQ uses native details elements, so it works without it." },
        ]}
      />
      <CtaBanner
        className="my-12"
        title="Start building"
        description="Copy a block into your app and make it yours."
        actionLabel="Get started"
        actionHref="/components"
      />
      <Footer
        brand="Tapas UI"
        note="MIT licensed. Sample content."
        columns={[
          { title: "Product", links: [{ label: "Cards", href: "/components" }, { label: "Blocks", href: "/blocks" }] },
          { title: "Project", links: [{ label: "GitHub", href: "https://github.com/tahmidbintaslim/tapas-ui" }] },
        ]}
      />
    </main>
  );
}
