import { cn } from "@/lib/utils";
import React from "react";

export interface Step {
  title: string;
  description: string;
}

export interface StepsProps extends Omit<React.ComponentProps<"section">, "title"> {
  title?: string;
  description?: string;
  steps: Step[];
}

/** One step's number and copy. Shared by the plain and motion versions. */
export function StepItem({ step, index }: { step: Step; index: number }) {
  return (
    <>
      <span aria-hidden="true" className="relative z-10 mx-auto grid size-10 place-items-center rounded-full border bg-background font-mono text-sm font-semibold">
        {index + 1}
      </span>
      <h3 className="mt-4 font-semibold">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
    </>
  );
}

/** Numbered how-it-works steps, connected by a line on wide screens. */
export function Steps({ title, description, steps, className, ...props }: StepsProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-16", className)} {...props}>
      {title && <h2 className="text-center text-3xl font-bold tracking-tight text-balance">{title}</h2>}
      {description && <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-muted-foreground">{description}</p>}
      {steps.length > 0 && (
        <div className="relative mt-12">
          <span aria-hidden="true" className="absolute top-5 right-[12%] left-[12%] hidden h-px bg-border md:block" />
          <ol className="relative grid gap-10 md:auto-cols-fr md:grid-flow-col">
            {steps.map((step, i) => (
              <li key={step.title} className="text-center">
                <span className="sr-only">Step {i + 1}: </span>
                <StepItem step={step} index={i} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
