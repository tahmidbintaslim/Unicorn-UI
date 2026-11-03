/**
 * Plain / Motion switch for docs pages. Radio inputs only: globals.css shows
 * the matching `[data-variant]` blocks inside the nearest `.variant-scope`.
 */
export function VariantSwitch({ name }: { name: string }) {
  return (
    <fieldset className="inline-flex rounded-lg bg-muted p-1 text-sm">
      <legend className="sr-only">Version</legend>
      {(["plain", "motion"] as const).map((value) => (
        <label
          key={value}
          className="cursor-pointer rounded-md px-3 py-1 font-medium text-muted-foreground has-[:checked]:bg-background has-[:checked]:text-foreground has-[:checked]:shadow-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand"
        >
          <input type="radio" name={name} value={value} defaultChecked={value === "plain"} className="sr-only" />
          {value === "plain" ? "Plain" : "Motion"}
        </label>
      ))}
    </fieldset>
  );
}
