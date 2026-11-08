// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const post = (email: string) => {
  const body = new FormData();
  body.set("email", email);
  return POST(new Request("http://site/examples/ledgerline/api/waitlist", { method: "POST", body }));
};
const outcome = (res: Response) => new URL(res.headers.get("location")!).searchParams.get("joined");

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("waitlist route", () => {
  it("rejects an invalid email without calling anything", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const res = await post("not-an-email");
    expect(res.status).toBe(303);
    expect(outcome(res)).toBe("invalid");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("without Resend keys, runs in demo mode and stores nothing", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    expect(outcome(await post("ana@example.com"))).toBe("demo");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("with Resend keys, adds the contact to the audience", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("RESEND_AUDIENCE_ID", "aud_1");
    const fetch = vi.fn(async () => new Response("{}", { status: 201 }));
    vi.stubGlobal("fetch", fetch);
    expect(outcome(await post(" Ana@Example.com "))).toBe("1");
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/audiences/aud_1/contacts");
    expect(JSON.parse(init.body as string)).toEqual({ email: "ana@example.com" });
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer re_test");
  });

  it("reports an error if Resend fails, instead of claiming success", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("RESEND_AUDIENCE_ID", "aud_1");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("no", { status: 500 })));
    expect(outcome(await post("ana@example.com"))).toBe("error");
  });

  it("treats a request that isn't a form as invalid, not a server error", async () => {
    const res = await POST(new Request("http://site/x", { method: "POST", body: JSON.stringify({ email: "a@b.co" }), headers: { "Content-Type": "application/json" } }));
    expect(res.status).toBe(303);
    expect(outcome(res)).toBe("invalid");
  });
});
