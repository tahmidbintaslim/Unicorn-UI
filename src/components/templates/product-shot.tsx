/** Sample product screenshot for templates: a labelled fake dashboard. Replace with your own. */
export function ProductShot({ label = "Sample dashboard" }: { label?: string }) {
  return (
    <div role="img" aria-label={label} className="rounded-2xl border bg-card p-4 shadow-xl">
      <div className="flex items-center gap-1.5 border-b pb-3">
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {["Active users", "Events", "Retention"].map((k, i) => (
          <div key={k} className="rounded-lg bg-muted/60 p-3">
            <div className="text-[11px] text-muted-foreground">{k}</div>
            <div className="mt-1 h-3 rounded bg-primary" style={{ width: `${55 + i * 15}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-32 items-end gap-1.5">
        {[35, 50, 44, 66, 58, 80, 72, 92, 86, 100].map((h, i) => (
          <span key={i} className="flex-1 rounded-t bg-primary" style={{ height: `${h}%`, opacity: 0.3 + i * 0.07 }} />
        ))}
      </div>
    </div>
  );
}
