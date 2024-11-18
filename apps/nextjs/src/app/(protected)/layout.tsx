import { SidebarInset, SidebarProvider } from "@repo/ui/sidebar";
import { redirect } from "next/navigation";

import isAuthenticated from "~/auth/isAuthenticated";

import AppSidebar from "./_components/AppSideBar";
import Breadcrumbs from "./_components/Breadcrumbs/Breadcrumbs";
import NavBar from "./_components/NavBar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  if (!isAuthenticated()) {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavBar />
        <div className="mx-auto w-full max-w-6xl">
          <div className="h-full p-4">
            <Breadcrumbs />
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
