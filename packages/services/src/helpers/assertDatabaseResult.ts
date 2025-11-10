import assert from "assert";

export default function assertDatabaseResult(value: unknown): asserts value {
  assert(value != null, new Error("INTERNAL_SERVER_ERROR"));
}
