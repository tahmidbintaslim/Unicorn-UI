import { AnnouncementBar } from "@/components/custom/announcement-bar/announcement-bar";
import { FooterSimple } from "@/components/custom/footer-simple/footer-simple";
import { Navbar } from "@/components/custom/navbar/navbar";
import { content as c } from "./content";

// A made-up company: keep it out of search results so nobody mistakes it for a real product.
export const metadata = {
  title: { default: "Stackwise: a Tapas UI demo", template: "%s | Stackwise (Tapas UI demo)" },
  description: "A fictional AI agent demo site built entirely from Tapas UI sections.",
  robots: { index: false, follow: true },
};

/** The demo site's frame: notice, navbar and footer, all from content.ts. */
export default function StackwiseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar message={c.demoNotice} link={{ label: "See how it's built", href: "/docs/sections" }} />
      <Navbar brand={c.brand.name} brandHref={c.brand.href} links={c.nav.links} action={c.nav.action} />
      <main>{children}</main>
      <FooterSimple brand={c.brand.name} links={c.footer.links} note={c.footer.note} />
    </div>
  );
}
