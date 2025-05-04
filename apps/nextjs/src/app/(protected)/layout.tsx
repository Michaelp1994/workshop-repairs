import type React from "react";

import { SidebarInset, SidebarProvider } from "@repo/ui/sidebar";
import { redirect } from "next/navigation";

import isAuthenticated from "~/auth/isAuthenticated";
import { api } from "~/trpc/server";

import AppSidebar from "./_components/AppSideBar";
import NavBar from "./_components/NavBar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
  breadcrumbs,
}: ProtectedLayoutProps) {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }
  const user = await api.users.getCurrentUser({});
  if (!user.onboardingCompleted) {
    redirect("/onboarding");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavBar>{breadcrumbs}</NavBar>
        <div className="mx-auto w-full max-w-6xl">
          <div className="h-full p-4">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
