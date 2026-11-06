import { createRegistryToken } from "@/lib/billing/tokens";
import { proConfig } from "@/lib/pro-config";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Issues a new personal registry token for a Pro subscriber and revokes their
 * older ones. The token is returned once; only its hash is stored.
 */
export async function POST() {
  if (!proConfig().enabled) return Response.json({ error: "Pro is not configured" }, { status: 503 });
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Sign in first" }, { status: 401 });
  const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
  if (profile?.plan !== "pro") return Response.json({ error: "Pro subscription required" }, { status: 403 });

  const admin = supabaseAdmin();
  const { token, hash } = createRegistryToken();
  await admin.from("registry_tokens").update({ revoked_at: new Date().toISOString() }).eq("user_id", user.id).is("revoked_at", null);
  const { error } = await admin.from("registry_tokens").insert({ user_id: user.id, token_hash: hash });
  if (error) return Response.json({ error: "Could not create a token" }, { status: 500 });
  return Response.json({ token }, { headers: { "Cache-Control": "no-store" } });
}
