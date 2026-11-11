import type * as React from "react";
import type { BlogGrid } from "@/components/custom/blog-grid/blog-grid";
import type { Changelog } from "@/components/custom/changelog/changelog";
import type { Footer } from "@/components/custom/footer/footer";
import type { Hero } from "@/components/custom/hero/hero";
import type { Navbar } from "@/components/custom/navbar/navbar";
import type { NewsletterProps } from "@/components/custom/newsletter/newsletter";
import type { ChangelogContent } from "./content";

/** The sections a changelog page is built from; plain and motion entry points pass their own versions. */
export interface ChangelogUi {
  Navbar: typeof Navbar;
  Hero: typeof Hero;
  Changelog: typeof Changelog;
  BlogGrid: typeof BlogGrid;
  // Plain and motion newsletters differ only in the motion-only onSubmit, which templates never pass.
  Newsletter: React.ComponentType<Omit<NewsletterProps, "onSubmit">>;
  Footer: typeof Footer;
}

/** A complete changelog page with recent posts and an email signup. */
export function ChangelogLayout({ c, ui }: { c: ChangelogContent; ui: ChangelogUi }) {
  const { Navbar, Hero, Changelog, BlogGrid, Newsletter, Footer } = ui;
  return (
    <>
      <Navbar brand={c.brand.name} brandHref={c.brand.href} links={c.nav.links} action={c.nav.action} />
      <main>
        <Hero {...c.hero} />
        <Changelog id="changelog" {...c.changelog} />
        <BlogGrid id="blog" {...c.blog} />
        <Newsletter id="subscribe" {...c.newsletter} />
      </main>
      <Footer brand={c.brand.name} {...c.footer} />
    </>
  );
}
