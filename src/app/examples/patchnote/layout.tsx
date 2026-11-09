import { AnnouncementBar } from "@/components/custom/announcement-bar/announcement-bar";
import { FooterSimple } from "@/components/custom/footer-simple/footer-simple";
import { NavbarFloating } from "@/components/custom/navbar-floating/navbar-floating";
import { content as c } from "./content";

export const metadata = { title: { default: "Patchnote: a Tapas UI demo", template: "%s | Patchnote (Tapas UI demo)" } };

/** The demo site's frame: notice, floating navbar and footer, all from content.ts. */
export default function PatchnoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar message={c.demoNotice} link={{ label: "See how it's built", href: "/docs/sections" }} />
      <NavbarFloating brand={c.brand.name} brandHref={c.brand.href} links={c.nav.links} action={c.nav.action} />
      <main>{children}</main>
      <FooterSimple brand={c.brand.name} links={c.footer.links} note={c.footer.note} />
    </div>
  );
}
