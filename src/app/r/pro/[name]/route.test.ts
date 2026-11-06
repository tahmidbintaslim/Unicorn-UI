// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import { hashToken } from "@/lib/billing/tokens";

const TOKEN = "tapas_pro_" + "a".repeat(43);
let row: { id: string; revoked_at: string | null; profiles: { plan: string } } | null;
const download = vi.fn(async () => ({ data: new Blob(['{"name":"hero-aurora"}']) }));
const lookups: string[] = [];

vi.mock("@/lib/pro-config", () => ({ proConfig: () => ({ enabled: true }) }));
vi.mock("@/lib/supabase/admin", () => ({
  supabaseAdmin: () => ({
    from: () => ({
      select: () => ({ eq: (_: string, hash: string) => (lookups.push(hash), { maybeSingle: async () => ({ data: row }) }) }),
      update: () => ({ eq: async () => ({}) }),
    }),
    storage: { from: () => ({ download }) },
  }),
}));

const { GET } = await import("./route");
const call = (name: string, auth?: string) =>
  GET(new Request(`http://x/r/pro/${name}`, { headers: auth ? { authorization: auth } : {} }), { params: Promise.resolve({ name }) });

beforeEach(() => {
  row = { id: "t1", revoked_at: null, profiles: { plan: "pro" } };
  lookups.length = 0;
  download.mockClear();
});

describe("private Pro registry", () => {
  it("serves an item to an active Pro token, looked up by hash", async () => {
    const res = await call("hero-aurora.json", `Bearer ${TOKEN}`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ name: "hero-aurora" });
    expect(lookups).toEqual([hashToken(TOKEN)]);
    expect(res.headers.get("cache-control")).toContain("no-store");
  });
  it("401 without a token", async () => {
    expect((await call("hero-aurora.json")).status).toBe(401);
  });
  it("401 for a malformed token", async () => {
    expect((await call("hero-aurora.json", "Bearer nope")).status).toBe(401);
  });
  it("401 for an unknown token", async () => {
    row = null;
    expect((await call("hero-aurora.json", `Bearer ${TOKEN}`)).status).toBe(401);
  });
  it("401 for a revoked token", async () => {
    row = { id: "t1", revoked_at: "2026-01-01", profiles: { plan: "pro" } };
    expect((await call("hero-aurora.json", `Bearer ${TOKEN}`)).status).toBe(401);
  });
  it("403 once the subscription has lapsed", async () => {
    row = { id: "t1", revoked_at: null, profiles: { plan: "free" } };
    expect((await call("hero-aurora.json", `Bearer ${TOKEN}`)).status).toBe(403);
    expect(download).not.toHaveBeenCalled();
  });
  it("404 for names that could escape the bucket", async () => {
    for (const name of ["../secrets", "a/b.json", "UPPER.json"]) expect((await call(name, `Bearer ${TOKEN}`)).status).toBe(404);
  });
});
