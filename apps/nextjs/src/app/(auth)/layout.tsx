import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import isAuthenticated from "~/auth/isAuthenticated";

interface AuthLayout {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayout) {
  if (await isAuthenticated()) {
    redirect("/dashboard");
  }
  return children;
}
