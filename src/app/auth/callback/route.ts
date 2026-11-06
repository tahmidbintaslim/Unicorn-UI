import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/** GitHub OAuth lands here; exchange the code for a session, then continue. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  // Only same-site paths, so the callback can't be used as an open redirect.
  const next = url.searchParams.get("next") ?? "/account";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/account";
  if (code) {
    const supabase = await supabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${url.origin}${safeNext}`);
  }
  return NextResponse.redirect(`${url.origin}/login?error=auth`);
}
