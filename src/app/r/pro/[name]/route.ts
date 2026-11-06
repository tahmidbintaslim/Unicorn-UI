import { bearerToken, hashToken } from "@/lib/billing/tokens";
import { proConfig } from "@/lib/pro-config";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NAME = /^[a-z0-9-]+(\.json)?$/;

/**
 * Private shadcn registry for Pro subscribers:
 * `GET /r/pro/<name>.json` with `Authorization: Bearer <token>`.
 * Items live in the private `pro-registry` storage bucket, never in this public repo.
 */
export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  if (!proConfig().enabled) return Response.json({ error: "Pro is not configured" }, { status: 503 });
  const { name } = await params;
  if (!NAME.test(name)) return Response.json({ error: "Not found" }, { status: 404 });

  const token = bearerToken(request.headers.get("authorization"));
  if (!token) return Response.json({ error: "Missing or malformed registry token" }, { status: 401 });

  const admin = supabaseAdmin();
  const { data: row } = await admin
    .from("registry_tokens")
    .select("id, revoked_at, profiles(plan)")
    .eq("token_hash", hashToken(token))
    .maybeSingle();
  const plan = (row?.profiles as { plan?: string } | null)?.plan;
  if (!row || row.revoked_at) return Response.json({ error: "Unknown or revoked token" }, { status: 401 });
  if (plan !== "pro") return Response.json({ error: "Pro subscription is not active" }, { status: 403 });

  const file = name.endsWith(".json") ? name : `${name}.json`;
  const { data: blob } = await admin.storage.from("pro-registry").download(file);
  if (!blob) return Response.json({ error: "Not found" }, { status: 404 });
  await admin.from("registry_tokens").update({ last_used_at: new Date().toISOString() }).eq("id", row.id);
  return new Response(await blob.text(), { headers: { "Content-Type": "application/json", "Cache-Control": "private, no-store" } });
}
