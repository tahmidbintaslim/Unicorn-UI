import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client that bypasses RLS. Server routes only (webhooks,
 * checkout, registry): never import this from a client component.
 */
export function supabaseAdmin() {
  if (typeof window !== "undefined") throw new Error("supabaseAdmin is server-only");
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
