import { Button, type ButtonProps } from "@repo/ui/button";
import { Eye, Pencil, PlusCircle, Trash2 } from "@repo/ui/icons";
import Link from "next/link";
import React, { type ComponentType } from "react";

interface IconButtonProps extends Omit<ButtonProps, "asChild"> {
  href: string;
  children: React.ReactNode;
  variant: "create" | "read" | "update" | "delete";
}

export function IconButton({
  href,
  children,
  variant,
  ...props
}: IconButtonProps) {
  const Icon =
    variant === "create"
      ? PlusCircle
      : variant === "read"
        ? Eye
        : variant === "update"
          ? Pencil
          : Trash2;
  return (
    <Button asChild {...props}>
      <Link href={href}>
        <Icon className="mr-1 size-4" />
        {children}
      </Link>
    </Button>
  );
}
