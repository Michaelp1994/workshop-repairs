"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/collapsible";
import {
  BriefcaseMedical,
  Building,
  ChartLine,
  ChevronRight,
  Cog,
  Handshake,
  Layers,
  MapPin,
  ScanBarcode,
  Users,
  Wrench,
} from "@repo/ui/icons";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@repo/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: ChartLine,
  },
  {
    title: "Repairs",
    href: "/repairs",
    icon: Wrench,
    isActive: true,
  },
  {
    href: "/clients",
    icon: Handshake,
    title: "Clients",
  },
  {
    href: "/locations",
    icon: MapPin,
    title: "Locations",
  },
  {
    title: "Assets",
    icon: ScanBarcode,
    href: "/assets",
    isActive: false,
  },
  {
    href: "/models",
    icon: Layers,
    title: "Models",
  },
  {
    href: "/manufacturers",
    icon: Building,
    title: "Manufacturers",
  },
  {
    href: "/equipment-types",
    icon: BriefcaseMedical,
    title: "Equipment Types",
  },
  {
    href: "/parts",
    icon: Cog,
    title: "Parts",
  },
  {
    title: "Users",
    icon: Users,
    href: "/users",
    isActive: false,
  },
];

export function NavMain() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(item.href)}
              tooltip={item.title}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
