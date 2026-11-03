import { cn } from "@/lib/utils";

export const THEMES = [
  { value: "zinc", label: "Zinc", swatch: "oklch(0.21 0.006 285.885)" },
  { value: "rose", label: "Rose", swatch: "oklch(0.586 0.253 17.585)" },
  { value: "blue", label: "Blue", swatch: "oklch(0.546 0.245 262.881)" },
  { value: "green", label: "Green", swatch: "oklch(0.527 0.154 150.069)" },
  { value: "orange", label: "Orange", swatch: "oklch(0.553 0.195 38.402)" },
] as const;

/**
 * Radio swatches that re-theme the nearest `.theme-demo` inside the same
 * `.theme-showcase` (rules in globals.css). No client JavaScript.
 */
export function ThemeSwatches({
  name,
  defaultValue = "blue",
  className,
}: {
  /** Radio group name; unique per page. */
  name: string;
  defaultValue?: (typeof THEMES)[number]["value"];
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {THEMES.map((theme) => (
        <label key={theme.value} className="relative grid size-7 cursor-pointer place-items-center rounded-full">
          <input
            type="radio"
            name={name}
            value={theme.value}
            defaultChecked={theme.value === defaultValue}
            className="peer absolute inset-0 cursor-pointer appearance-none rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          />
          <span
            aria-hidden="true"
            style={{ background: theme.swatch }}
            className="size-[18px] rounded-full ring-1 ring-foreground/25 transition-shadow peer-checked:ring-2 peer-checked:ring-foreground peer-checked:ring-offset-2 peer-checked:ring-offset-card"
          />
          <span className="sr-only">{theme.label}</span>
        </label>
      ))}
    </div>
  );
}
