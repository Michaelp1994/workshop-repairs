"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/breadcrumb";
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
    <Breadcrumb>
      <BreadcrumbList>
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
                <BreadcrumbLink className="capitalize">
                  {route.label}
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
