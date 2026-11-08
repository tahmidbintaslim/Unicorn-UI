import { cn } from "@/lib/utils";
import { CopyButton } from "../_site/copy-button";
import Link from "next/link";
import type { PropDoc } from "./_content";

/** Page title block shared by all docs pages. */
export function DocsHeader({ crumb, title, lead }: { crumb?: string; title: string; lead: string }) {
  return (
    <header className="space-y-4">
      {crumb && (
        <p className="text-[13px] text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span aria-hidden="true"> / </span>
          {crumb}
        </p>
      )}
      <h1 className="text-4xl font-semibold tracking-[-0.03em]">{title}</h1>
      <p className="max-w-[68ch] text-[17px] leading-relaxed text-pretty text-muted-foreground">{lead}</p>
    </header>
  );
}

export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 pt-4 text-[22px] font-semibold tracking-tight">
      {children}
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[68ch] leading-relaxed text-muted-foreground">{children}</p>;
}

/** Inline code. */
export function C({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">{children}</code>;
}

export function CodeBlock({ code, label, className }: { code: string; label?: string; className?: string }) {
  return (
    <figure className={cn("relative overflow-hidden rounded-xl border bg-card", className)}>
      {label && (
        <figcaption className="border-b px-4 py-2 pr-24 font-mono text-xs text-muted-foreground">{label}</figcaption>
      )}
      <CopyButton text={code} label="Copy" className="absolute top-1.5 right-1.5 h-7 bg-card px-2 text-xs" />
      <pre tabIndex={0} className="max-h-[32rem] overflow-auto p-4 font-mono text-[13px] leading-relaxed focus-visible:outline-2 focus-visible:outline-brand">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export function PropsTable({ rows }: { rows: PropDoc[] }) {
  return (
    <div tabIndex={0} className="overflow-x-auto rounded-xl border focus-visible:outline-2 focus-visible:outline-brand">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="bg-muted/60 text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-2.5 font-medium">Prop</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Default</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row) => (
            <tr key={row.name} className="align-top">
              <td className="px-4 py-3 font-mono text-[13px] whitespace-nowrap">
                {row.name}
                {row.required && <span className="ml-1 text-brand" title="Required">*</span>}
                {row.required && <span className="sr-only"> (required)</span>}
              </td>
              <td className="px-4 py-3 font-mono text-[12.5px] text-muted-foreground">{row.type}</td>
              <td className="px-4 py-3 font-mono text-[12.5px] text-muted-foreground">{row.default ?? "–"}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** "On this page" links for wide screens. */
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="sticky top-24 hidden w-44 shrink-0 space-y-2.5 self-start text-[13px] xl:block">
      <p className="font-semibold text-muted-foreground">On this page</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
