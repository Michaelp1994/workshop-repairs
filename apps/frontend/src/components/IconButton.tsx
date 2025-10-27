import { Button, type ButtonProps } from "@repo/ui/button";
import { Eye, Pencil, PlusCircle, Trash2 } from "@repo/ui/icons";
import { Link } from "@tanstack/react-router";
import React from "react";

interface IconButtonProps extends Omit<ButtonProps, "asChild" | "variant"> {
  href: string;
  children: React.ReactNode;
  scroll?: boolean;
  variant: "create" | "read" | "update" | "delete";
}

export function IconButton({
  href,
  children,
  variant,
  scroll,
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
      <Link scroll={scroll} to={href}>
        <Icon className="mr-1 size-4" />
        {children}
      </Link>
    </Button>
  );
}
