// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const post = (email: string) => {
  const body = new FormData();
  body.set("email", email);
  return POST(new Request("http://site/examples/stackwise/api/waitlist", { method: "POST", body }));
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

  it("with Resend keys, creates the contact in the segment", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("RESEND_SEGMENT_ID", "seg_1");
    const fetch = vi.fn(async () => new Response("{}", { status: 201 }));
    vi.stubGlobal("fetch", fetch);
    expect(outcome(await post(" Ana@Example.com "))).toBe("1");
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/contacts");
    expect(JSON.parse(init.body as string)).toEqual({ email: "ana@example.com", segments: [{ id: "seg_1" }] });
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer re_test");
  });

  it("adds an existing contact to the segment when create says it already exists", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("RESEND_SEGMENT_ID", "seg_1");
    const fetch = vi.fn(async (url: string) => (url.endsWith("/contacts") ? new Response("exists", { status: 409 }) : new Response("{}", { status: 201 })));
    vi.stubGlobal("fetch", fetch);
    expect(outcome(await post("ana@example.com"))).toBe("1");
    expect(fetch.mock.calls[1][0]).toBe("https://api.resend.com/contacts/ana%40example.com/segments/seg_1");
  });

  it("reports an error if Resend fails, instead of claiming success", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("RESEND_SEGMENT_ID", "seg_1");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("no", { status: 500 })));
    expect(outcome(await post("ana@example.com"))).toBe("error");
  });

  it("treats a request that isn't a form as invalid, not a server error", async () => {
    const res = await POST(new Request("http://site/x", { method: "POST", body: JSON.stringify({ email: "a@b.co" }), headers: { "Content-Type": "application/json" } }));
    expect(res.status).toBe(303);
    expect(outcome(res)).toBe("invalid");
  });

  it("quietly drops bot submissions that fill the hidden honeypot field", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("RESEND_SEGMENT_ID", "seg_1");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const body = new FormData();
    body.set("email", "bot@example.com");
    body.set("website", "http://spam.example");
    const res = await POST(new Request("http://site/x", { method: "POST", body }));
    expect(outcome(res)).toBe("1");
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("waitlist origin check", () => {
  it("rejects a form posted from another site", async () => {
    const body = new FormData();
    body.set("email", "a@b.co");
    const res = await POST(new Request("http://site/x", { method: "POST", body, headers: { Origin: "https://evil.example" } }));
    expect(res.status).toBe(403);
  });
});
