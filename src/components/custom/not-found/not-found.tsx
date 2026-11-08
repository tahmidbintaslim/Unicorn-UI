import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export interface NotFoundProps extends Omit<React.ComponentProps<"section">, "title"> {
  /** Heading element for the title. Use "h2" when this is not the page's main heading. */
  titleAs?: "h1" | "h2";
  code?: string;
  title?: string;
  description?: string;
  home?: { label: string; href: string };
  /** Extra helpful links, such as Docs or Contact */
  links?: { label: string; href: string }[];
}

/** Copy shared by the plain and motion versions. */
export function NotFoundCopy({ titleAs: TitleTag = "h1", title, description, home, links }: Required<Pick<NotFoundProps, "title" | "description" | "home">> & Pick<NotFoundProps, "links" | "titleAs">) {
  return (
    <>
      <TitleTag className="mt-6 text-3xl font-bold tracking-tight">{title}</TitleTag>
      <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">{description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <a href={home.href}>{home.label}</a>
        </Button>
        {links?.map((l) => (
          <Button key={l.href} asChild size="lg" variant="outline">
            <a href={l.href}>{l.label}</a>
          </Button>
        ))}
      </div>
    </>
  );
}

/** A friendly 404 page section. Use it in app/not-found.tsx. */
export function NotFound({
  code = "404",
  title = "Page not found",
  description = "The page you're looking for moved or never existed.",
  home = { label: "Back to home", href: "/" },
  links,
  titleAs,
  className,
  ...props
}: NotFoundProps) {
  return (
    <section className={cn("mx-auto max-w-2xl px-4 py-24 text-center", className)} {...props}>
      <p aria-hidden="true" className="text-8xl font-black tracking-tighter text-primary sm:text-9xl">
        {code}
      </p>
      <NotFoundCopy {...{ title, description, home, links, titleAs }} />
    </section>
  );
}
