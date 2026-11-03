/** Two-level merge: each top-level key's object is shallow-merged with the override. */
export type ContentOverrides<T> = { [K in keyof T]?: Partial<T[K]> };

export function mergeContent<T extends object>(defaults: T, overrides?: ContentOverrides<T>): T {
  if (!overrides) return defaults;
  const out = { ...defaults };
  for (const key of Object.keys(overrides) as (keyof T)[]) {
    out[key] = { ...defaults[key], ...overrides[key] } as T[keyof T];
  }
  return out;
}
