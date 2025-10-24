import { TRPCError } from "@trpc/server";
import assert from "assert";

export default function assertDatabaseResult(value: unknown): asserts value {
  return assert(
    value != null,
    new TRPCError({ code: "INTERNAL_SERVER_ERROR" }),
  );
}
