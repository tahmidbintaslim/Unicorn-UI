import { afterEach, describe, expect, it, vi } from "vitest";
import { getStarCount } from "./github-stars";

afterEach(() => vi.unstubAllGlobals());

describe("getStarCount", () => {
  it("returns stargazers_count", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ stargazers_count: 42 }), { status: 200 })));
    expect(await getStarCount()).toBe(42);
  });
  it("returns null on 403", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("rate limited", { status: 403 })));
    expect(await getStarCount()).toBeNull();
  });
  it("returns null when fetch throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(await getStarCount()).toBeNull();
  });
});
