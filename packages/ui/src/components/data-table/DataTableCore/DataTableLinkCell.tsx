import type { ComponentProps } from "react";

import { Link } from "@tanstack/react-router";

import { cn } from "../../../lib/utils";

export function DataTableLinkCell({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link className={cn("font-bold hover:underline", className)} {...props} />
  );
}
