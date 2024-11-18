"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/breadcrumb";
import { Home } from "@repo/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import BreadcrumbMap from "./BreadcrumbMap";

export default function Breadcrumbs() {
  const pathName = usePathname();
  const routes = BreadcrumbMap(pathName);
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild className="capitalize">
            <Link href="/dashboard">
              <Home className="size-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {routes.length > 0 && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}
        {routes.map((route, index) => {
          if (index === routes.length - 1) {
            return (
              <BreadcrumbItem key={route.label}>
                <BreadcrumbPage className="capitalize">
                  {route.label}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return (
            <React.Fragment key={route.href}>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild className="capitalize">
                  <Link href={route.href}>{route.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
