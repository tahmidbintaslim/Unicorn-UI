import { cn } from "@/lib/utils";
import React from "react";

export interface TeamMember {
  name: string;
  role: string;
  /** Image URL; initials are shown without one */
  avatar?: string;
  bio?: string;
  links?: { label: string; href: string }[];
}

export interface TeamProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  people: TeamMember[];
}

export const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p.charAt(0))
    .slice(0, 2)
    .join("");

/** The people behind the product. */
export function Team({ title, description, people, className, ...props }: TeamProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...props}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      {people.length > 0 && (
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p) => (
            <li key={p.name} className="text-center">
              {p.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the section framework-agnostic
                <img src={p.avatar} alt="" className="mx-auto size-24 rounded-full object-cover" />
              ) : (
                <span aria-hidden="true" className="mx-auto grid size-24 place-items-center rounded-full bg-muted text-xl font-semibold">
                  {initials(p.name)}
                </span>
              )}
              <h3 className="mt-4 font-semibold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.role}</p>
              {p.bio && <p className="mt-2 text-sm text-pretty text-muted-foreground">{p.bio}</p>}
              {p.links && p.links.length > 0 && (
                <ul className="mt-3 flex justify-center gap-3 text-sm">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} aria-label={`${p.name} on ${l.label}`} className="text-primary underline-offset-4 hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
