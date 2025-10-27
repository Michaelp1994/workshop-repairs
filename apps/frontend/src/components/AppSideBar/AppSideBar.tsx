import { Sidebar, SidebarContent } from "@repo/ui/sidebar";
import * as React from "react";

import NavHeader from "./nav-header";
import { NavMain } from "./nav-main";

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>,
) {
  return (
    <Sidebar {...props}>
      <NavHeader />
      <SidebarContent>
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}
