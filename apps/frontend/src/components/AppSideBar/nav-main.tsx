import {
  BriefcaseMedical,
  Building,
  ChartLine,
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
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";

const items = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: ChartLine,
  },
  {
    title: "Repairs",
    to: "/repairs",
    icon: Wrench,
  },
  {
    to: "/clients",
    icon: Handshake,
    title: "Clients",
  },
  {
    to: "/locations",
    icon: MapPin,
    title: "Locations",
  },
  {
    title: "Assets",
    icon: ScanBarcode,
    to: "/assets",
  },
  {
    to: "/models",
    icon: Layers,
    title: "Models",
  },
  {
    to: "/manufacturers",
    icon: Building,
    title: "Manufacturers",
  },
  {
    to: "/equipment-types",
    icon: BriefcaseMedical,
    title: "Equipment Types",
  },
  {
    to: "/parts",
    icon: Cog,
    title: "Parts",
  },
  {
    title: "Users",
    icon: Users,
    to: "/users",
  },
];

export function NavMain() {
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={location.pathname.startsWith(item.to)}
              tooltip={item.title}
            >
              <Link to={item.to}>
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
