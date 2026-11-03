import { cn } from "@/lib/utils";

/** Tapas logo: a small plate seen from above. Decorative; pair it with the name. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5 text-brand", className)}
    >
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="var(--background)" strokeOpacity="0.45" strokeWidth="1.5" />
    </svg>
  );
}
