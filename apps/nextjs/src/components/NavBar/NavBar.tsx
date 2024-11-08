import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@repo/ui/navigation-menu";
import Link from "next/link";
import React from "react";

import ProfileButton from "./ProfileButton";

const RepairList = [
  {
    href: "/repairs",
    title: "Repairs",
    text: "Repairs",
  },
  {
    href: "/clients",
    title: "Clients",
    text: "Clients",
  },
  {
    href: "/locations",
    title: "Locations",
    text: "Locations",
  },
];

const AssetList = [
  {
    href: "/assets",
    title: "Assets",
    text: "Assets",
  },
  {
    href: "/models",
    title: "Models",
    text: "Models",
  },
  {
    href: "/manufacturers",
    title: "Manufacturers",
    text: "Manufacturers",
  },
  {
    href: "/equipment-types",
    title: "Equipment Types",
    text: "Equipment Types",
  },
  {
    href: "/parts",
    title: "Parts",
    text: "Parts",
  },
];

export default function NavBar() {
  return (
    <header className="bg-background top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Repairs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {RepairList.map((item) => (
                    <ListItem
                      href={item.href}
                      key={item.href}
                      title={item.title}
                    >
                      {item.text}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Assets</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {AssetList.map((item) => (
                    <ListItem
                      href={item.href}
                      key={item.href}
                      title={item.title}
                    >
                      {item.text}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div className="flex-1" />

      <ProfileButton />
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, children, ...props }, ref) => {
  return (
    <li>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors">
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

{
  /* <a
className={cn(
  "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
  className,
)}
ref={ref}
{...props}
> */
}
