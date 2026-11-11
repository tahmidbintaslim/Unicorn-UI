import { BlogGridMotion } from "@/components/custom/blog-grid/blog-grid-motion";
import { ChangelogMotion } from "@/components/custom/changelog/changelog-motion";
import { Footer } from "@/components/custom/footer/footer";
import { HeroMotion } from "@/components/custom/hero/hero-motion";
import { Navbar } from "@/components/custom/navbar/navbar";
import { NewsletterMotion } from "@/components/custom/newsletter/newsletter-motion";
import { mergeContent, type ContentOverrides } from "../merge";
import { ChangelogLayout } from "./changelog-layout";
import { changelogContent, type ChangelogContent } from "./content";

/** The changelog template with motion sections; the navbar and footer stay plain. */
export function ChangelogTemplateMotion({ content }: { content?: ContentOverrides<ChangelogContent> }) {
  return (
    <ChangelogLayout
      c={mergeContent(changelogContent, content)}
      ui={{ Navbar, Hero: HeroMotion, Changelog: ChangelogMotion, BlogGrid: BlogGridMotion, Newsletter: NewsletterMotion, Footer }}
    />
  );
}
