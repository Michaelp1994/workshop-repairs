import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import isAuthenticated from "~/auth/isAuthenticated";

interface AuthLayout {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayout) {
  if (isAuthenticated()) {
    redirect("/dashboard");
  }
  return children;
}
