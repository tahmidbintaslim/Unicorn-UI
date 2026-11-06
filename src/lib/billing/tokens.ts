import { createHash, randomBytes } from "node:crypto";

const PREFIX = "tapas_pro_";

/** SHA-256 of a registry token, as stored in `registry_tokens.token_hash`. */
export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

/**
 * A new personal registry token. The plain token is shown to the subscriber
 * once; only its hash is saved.
 */
export function createRegistryToken() {
  const token = PREFIX + randomBytes(32).toString("base64url");
  return { token, hash: hashToken(token) };
}

/** The token from an `Authorization: Bearer <token>` header, if it looks like ours. */
export function bearerToken(header: string | null) {
  const match = header?.match(/^Bearer\s+(tapas_pro_[A-Za-z0-9_-]{40,})$/);
  return match?.[1] ?? null;
}
