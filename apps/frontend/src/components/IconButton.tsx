import type {
  RegisteredRouter,
  ValidateLinkOptions,
} from "@tanstack/react-router";

import { Button, type ButtonProps } from "@repo/ui/button";
import { Eye, Pencil, PlusCircle, Trash2 } from "@repo/ui/icons";
import { Link } from "@tanstack/react-router";
import React from "react";

interface IconButtonProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> extends Omit<ButtonProps, "asChild" | "variant"> {
  linkOptions: ValidateLinkOptions<TRouter, TOptions>;
  children: React.ReactNode;
  variant: "create" | "read" | "update" | "delete";
}

export function IconButton<TRouter extends RegisteredRouter, TOptions>(
  props: IconButtonProps<TRouter, TOptions>,
): React.ReactNode;
export function IconButton({
  linkOptions,
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
      <Link {...linkOptions}>
        <Icon className="mr-1 size-4" />
        {children}
      </Link>
    </Button>
  );
}
