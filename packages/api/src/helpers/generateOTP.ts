/**
 * Generate password from allowed word
 */
import { randomInt } from "crypto";

const digits = "0123456789";

export default function generateOTP() {
  const allowsChars = digits;

  const password: string = Array.from({ length: 6 }, () => {
    const charIndex = randomInt(0, allowsChars.length);
    return allowsChars[charIndex];
  }).join("");

  return password;
}
