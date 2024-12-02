import type React from "react";

import { Separator } from "@repo/ui/separator";
import { SidebarTrigger } from "@repo/ui/sidebar";

import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";

interface NavBarProps {
  children: React.ReactNode;
}

export default function NavBar({ children }: NavBarProps) {
  return (
    <header className="bg-sidebar flex h-16 items-center justify-between border-b px-4">
      <div className="flex shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator className="mr-2 h-4" orientation="vertical" />
        {children}
      </div>
      <div className="flex items-center gap-2">
        <SearchBar />
        <ProfileButton />
      </div>
    </header>
  );
}
