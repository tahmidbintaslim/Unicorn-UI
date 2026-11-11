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

/** Sample phone screenshot for templates: a labelled fake app screen. Replace with your own. */
export function PhoneShot({ label = "Sample app screen" }: { label?: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[16rem] rounded-[2.5rem] border-8 border-foreground/10 bg-card p-4 shadow-xl">
      <div className="mx-auto h-1.5 w-16 rounded-full bg-muted-foreground/30" />
      <div className="mt-5 h-3 w-24 rounded bg-primary" />
      <div className="mt-2 h-2 w-32 rounded bg-muted-foreground/30" />
      <div className="mt-5 grid grid-cols-2 gap-2">
        {[70, 45, 85, 60].map((w, i) => (
          <div key={i} className="rounded-xl bg-muted/60 p-3">
            <div className="size-5 rounded-md bg-primary/70" />
            <div className="mt-3 h-1.5 rounded bg-muted-foreground/30" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {[90, 75, 82].map((w, i) => (
          <div key={i} className="flex items-center gap-2 rounded-xl bg-muted/60 p-2">
            <span className="size-6 shrink-0 rounded-full bg-primary/40" />
            <span className="h-1.5 rounded bg-muted-foreground/30" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-around border-t pt-3">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i === 0 ? "size-4 rounded bg-primary" : "size-4 rounded bg-muted-foreground/30"} />
        ))}
      </div>
    </div>
  );
}
