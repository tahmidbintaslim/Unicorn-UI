import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React from "react";

export interface ProofPerson {
  name: string;
  /** Image URL; the first letter is shown without one */
  avatar?: string;
}

export interface SocialProofProps extends React.ComponentProps<"div"> {
  /** One line, such as "Used by 300 indie teams". Keep it true. */
  text: string;
  people: ProofPerson[];
  /** Average rating out of 5 */
  rating?: number;
}

/** One avatar in the stack. Shared by the plain and motion versions. */
export function ProofAvatar({ person }: { person: ProofPerson }) {
  return person.avatar ? (
    // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the section framework-agnostic
    <img src={person.avatar} alt="" className="size-9 rounded-full border-2 border-background object-cover" />
  ) : (
    <span aria-hidden="true" className="grid size-9 place-items-center rounded-full border-2 border-background bg-muted text-xs font-semibold">
      {person.name.charAt(0)}
    </span>
  );
}

/** Stars plus the rating in words for screen readers. */
export function ProofRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      <span aria-hidden="true" className="flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={cn("size-4", i < Math.round(rating) ? "fill-primary text-primary" : "text-muted-foreground/40")} />
        ))}
      </span>
      <span className="sr-only">Rated {rating} out of 5</span>
    </span>
  );
}

/** A compact proof row: avatar stack, optional star rating and one line of text. */
export function SocialProof({ text, people, rating, className, ...props }: SocialProofProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 sm:flex-row sm:justify-center", className)} {...props}>
      {people.length > 0 && (
        <div className="flex -space-x-2">
          {people.map((p) => (
            <ProofAvatar key={p.name} person={p} />
          ))}
        </div>
      )}
      <div className="flex flex-col items-center gap-1 sm:items-start">
        {rating !== undefined && <ProofRating rating={rating} />}
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
