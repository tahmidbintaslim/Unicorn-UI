import { BlogGrid } from "@/components/custom/blog-grid/blog-grid";
import { Changelog } from "@/components/custom/changelog/changelog";
import { Footer } from "@/components/custom/footer/footer";
import { Hero } from "@/components/custom/hero/hero";
import { Navbar } from "@/components/custom/navbar/navbar";
import { Newsletter } from "@/components/custom/newsletter/newsletter";
import { mergeContent, type ContentOverrides } from "../merge";
import { ChangelogLayout } from "./changelog-layout";
import { changelogContent, type ChangelogContent } from "./content";

/** Free changelog page template, built only from plain Tapas sections. */
export function ChangelogTemplate({ content }: { content?: ContentOverrides<ChangelogContent> }) {
  return (
    <ChangelogLayout
      c={mergeContent(changelogContent, content)}
      ui={{ Navbar, Hero, Changelog, BlogGrid, Newsletter, Footer }}
    />
  );
}
