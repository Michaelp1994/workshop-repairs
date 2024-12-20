import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav aria-label="breadcrumb" ref={ref} {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    className={cn(
      "text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5",
      className,
    )}
    ref={ref}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    className={cn("inline-flex items-center gap-1.5", className)}
    ref={ref}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      className={cn("hover:text-foreground transition-colors", className)}
      ref={ref}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    aria-current="page"
    aria-disabled="true"
    className={cn("text-foreground font-normal", className)}
    ref={ref}
    role="link"
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    role="presentation"
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    role="presentation"
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

interface BreadcrumbProps {
  routes: {
    label: string;
    href: string;
  }[];
}

function Breadcrumbs({ routes = [] }: BreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {routes.length > 0 ? (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">
                <Home className="size-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        ) : (
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage>
              <Home className="size-4" />
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {routes.map(({ label, href }, index) => {
          if (index === routes.length - 1) {
            return (
              <BreadcrumbPage className="capitalize" key={href}>
                {label}
              </BreadcrumbPage>
            );
          }
          return (
            <React.Fragment key={href}>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink className="capitalize" href={href}>
                  {label}
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

export { Breadcrumbs };
