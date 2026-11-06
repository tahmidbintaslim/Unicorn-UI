"use client";

import { Button } from "@/components/ui/button";
import { REGISTRY_URL } from "../_site/links";
import React from "react";

/** Creates a registry token and shows it once, with the components.json snippet that uses it. */
export function TokenPanel({ hasToken }: { hasToken: boolean }) {
  const [token, setToken] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const create = async () => {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/registry-token", { method: "POST" });
    const body = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) setToken(body.token);
    else setError(body.error ?? "Could not create a token.");
  };

  const snippet = `{
  "registries": {
    "@tapas-pro": {
      "url": "${REGISTRY_URL}/pro/{name}.json",
      "headers": { "Authorization": "Bearer \${TAPAS_PRO_TOKEN}" }
    }
  }
}`;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        The shadcn CLI uses this token to install Pro items. Creating a new one revokes the old one.
      </p>
      <Button onClick={create} disabled={busy} variant={hasToken ? "outline" : "default"}>
        {busy ? "Creating…" : hasToken ? "Replace token" : "Create token"}
      </Button>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      {token && (
        <div className="space-y-3" role="status">
          <p className="text-sm font-medium">Copy it now. It won&apos;t be shown again.</p>
          <pre className="overflow-x-auto rounded-lg border bg-muted p-3 font-mono text-xs">TAPAS_PRO_TOKEN={token}</pre>
          <p className="text-sm text-muted-foreground">
            Put that line in <code className="font-mono">.env.local</code>, add this to <code className="font-mono">components.json</code>, then run{" "}
            <code className="font-mono">npx shadcn@latest add @tapas-pro/&lt;name&gt;</code>:
          </p>
          <pre className="overflow-x-auto rounded-lg border bg-muted p-3 font-mono text-xs">{snippet}</pre>
        </div>
      )}
    </div>
  );
}
