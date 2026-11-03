import Link from "next/link";
import { installCommand } from "../../_site/links";
import { CopyCommand } from "../../_site/copy-command";
import type { TemplateMeta } from "../../_site/templates";

/**
 * Thin bar above a template demo: back link, Plain/Motion switch and the
 * install command for the version on screen. Not part of the template.
 */
export function TemplateBar({ template, motion }: { template: TemplateMeta; motion: boolean }) {
  const base = `/templates/${template.slug}`;
  const tab = "rounded-md px-3 py-1 text-xs font-medium transition-colors";
  return (
    <div className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-2 text-sm sm:px-6">
        <Link href="/templates" className="text-muted-foreground hover:text-foreground">
          ← Templates
        </Link>
        <span className="font-medium">{template.title}</span>
        <nav aria-label="Template version" className="flex rounded-lg border p-0.5">
          <Link href={base} aria-current={motion ? undefined : "page"} className={`${tab} ${motion ? "text-muted-foreground" : "bg-muted text-foreground"}`}>
            Plain
          </Link>
          <Link href={`${base}/motion`} aria-current={motion ? "page" : undefined} className={`${tab} ${motion ? "bg-muted text-foreground" : "text-muted-foreground"}`}>
            Motion
          </Link>
        </nav>
        <div className="ml-auto hidden min-w-0 md:block">
          <CopyCommand className="py-1.5" command={installCommand(motion ? `${template.registry}-motion` : template.registry)} />
        </div>
      </div>
    </div>
  );
}
