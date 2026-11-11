import { cn } from "@/lib/utils";

/** The three plates of the mark, back to front: olive, paprika, saffron. Shared with the animated hero mark. */
export const PLATES = [
  { cx: 7, cy: 16.5, color: "var(--olive)" },
  { cx: 12, cy: 12, color: "var(--paprika)" },
  { cx: 17, cy: 7.5, color: "var(--saffron)" },
] as const;

/** One plate: a filled disc with a rim, outlined in the page color so overlaps read as separate plates. */
export function Plate({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="6" fill={color} stroke="var(--background)" strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r="3.4" fill="none" stroke="var(--background)" strokeOpacity="0.35" strokeWidth="1" />
    </g>
  );
}

/** Tapas logo: a flight of three small plates. Decorative; pair it with the name. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-6", className)}>
      {PLATES.map((p) => (
        <Plate key={p.color} {...p} />
      ))}
    </svg>
  );
}
