import type React from "react";

import { cn } from "../lib/utils";

export function DetailsList({
  children,
  className,
  ...props
}: React.ComponentProps<"dl">) {
  return (
    <dl
      className={cn("grid grid-cols-[auto_1fr] items-start gap-4", className)}
      {...props}
    >
      {children}
    </dl>
  );
}

export function DetailsLabel({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <dt className={cn("font-bold", className)} {...props}>
      {children}
    </dt>
  );
}

export function DetailsValue({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <dd className={cn(className)} {...props}>
      {children}
    </dd>
  );
}
