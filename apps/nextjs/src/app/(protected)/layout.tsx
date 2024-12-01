import { SidebarInset, SidebarProvider } from "@repo/ui/sidebar";
import { redirect } from "next/navigation";

import isAuthenticated from "~/auth/isAuthenticated";
import { api } from "~/trpc/server";

import AppSidebar from "./_components/AppSideBar";
import NavBar from "./_components/NavBar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  if (!isAuthenticated()) {
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
        <NavBar />
        <div className="mx-auto w-full max-w-6xl">
          <div className="h-full p-4">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
