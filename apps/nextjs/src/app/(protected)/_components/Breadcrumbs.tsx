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
import { Separator } from "@repo/ui/separator";
import Link from "next/link";
import React from "react";

interface Route {
  href: string;
  label: string;
}

interface BreadcrumbProps {
  routes: Route[];
}

export default function Breadcrumbs({ routes }: BreadcrumbProps) {
  return (
    <Breadcrumb separator={<Separator />}>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild className="capitalize">
            <Link href="/dashboard">
              <Home className="size-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {routes.map((route, index) => {
          if (index === routes.length - 1) {
            return (
              <BreadcrumbItem key={route.href}>
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
