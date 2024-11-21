import type { ComponentProps } from "react";

import Link from "next/link";

import { cn } from "../../../lib/utils";

export function DataTableLinkCell({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link className={cn("font-bold hover:underline", className)} {...props} />
  );
}
