import { expect, test } from "vitest";

import { hashPassword, verifyPasswordHash } from "./password";
test("Can hash and verify password.", async () => {
  const password = "TESTPASSWORD";
  const hash = await hashPassword(password);
  const passwordCorrect = await verifyPasswordHash(hash, password);
  expect(passwordCorrect).toBe(true);
});
