"use server";
import { signOut } from "@repo/auth";

export default async function logout() {
  return await signOut();
}
