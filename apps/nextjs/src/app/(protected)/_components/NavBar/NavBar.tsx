import { Separator } from "@repo/ui/separator";
import { SidebarTrigger } from "@repo/ui/sidebar";

import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <header className="bg-sidebar flex h-16 items-center justify-between border-b px-4">
      <div className="flex shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator className="mr-2 h-4" orientation="vertical" />
        <SearchBar />
      </div>
      <div className="flex gap-2">
        <ProfileButton />
      </div>
    </header>
  );
}
