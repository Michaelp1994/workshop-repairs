import type { Prettify, RemoveUndefined } from "@repo/validators/types";

/*** This is required because Zod allows undefined values in the input when the schema is partial */
export function sanitizeUpdateInput<T extends Record<string, unknown>>(
  obj: T,
): Prettify<RemoveUndefined<T>> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  ) as Prettify<RemoveUndefined<T>>;
}
