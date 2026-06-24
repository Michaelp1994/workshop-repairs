import { TRPCError } from "@trpc/server";

export function splitSlug(slug: string) {
  const regex = /^(.*?)(\d+)$/;
  const match = regex.exec(slug);

  if (!match?.[1] || !match[2]) {
    console.log("Invalid slug format:", slug);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid ID",
    });
  }

  const prefix = match[1].toUpperCase();
  const localId = parseInt(match[2], 10);
  console.log({ prefix, localId });
  return { prefix, localId };
}

export function createSlug(prefix: string, localId: number) {
  const stringId = localId.toFixed(0);
  const paddedId = stringId.padStart(5, "0");
  return `${prefix}${paddedId}`;
}
