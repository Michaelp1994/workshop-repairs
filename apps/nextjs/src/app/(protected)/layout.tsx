import { SidebarInset, SidebarProvider } from "@repo/ui/sidebar";
import { redirect } from "next/navigation";

import { isAuthenticated, onboardingCompleted } from "~/auth/cookies";

import AppSidebar from "./_components/AppSideBar";
import NavBar from "./_components/NavBar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  if (!isAuthenticated()) {
    redirect(`/login`);
  }
  if (!onboardingCompleted()) {
    redirect(`/onboarding`);
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavBar />
        <div className="h-full p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
