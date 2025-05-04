"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "../lib/utils";

const Separator = ({
  ref,
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) => (
  <SeparatorPrimitive.Root
    className={cn(
      "bg-border shrink-0",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    )}
    decorative={decorative}
    orientation={orientation}
    ref={ref}
    {...props}
  />
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
