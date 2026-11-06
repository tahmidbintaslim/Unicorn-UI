"use client";

import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Github } from "lucide-react";
import React from "react";

/** Starts GitHub sign-in through Supabase Auth, then returns to `next`. */
export function GitHubButton({ next }: { next: string }) {
  const [busy, setBusy] = React.useState(false);
  return (
    <Button
      size="lg"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
        const { error } = await supabaseBrowser().auth.signInWithOAuth({ provider: "github", options: { redirectTo } });
        if (error) setBusy(false);
      }}
    >
      <Github aria-hidden="true" />
      {busy ? "Opening GitHub…" : "Continue with GitHub"}
    </Button>
  );
}
