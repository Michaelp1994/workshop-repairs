import { Button, type ButtonProps } from "@repo/ui/button";
import { PlusCircle } from "@repo/ui/icons";
import Link from "next/link";
import { type ComponentType } from "react";

interface ButtonLinkProps extends Omit<ButtonProps, "asChild"> {
  href: string;
  children: React.ReactNode;
  Icon?: ComponentType<any>;
}

export function ButtonLink({
  href,
  children,
  Icon,
  ...props
}: ButtonLinkProps) {
  return (
    <Button asChild {...props}>
      <Link href={href}>
        {Icon && <Icon className="mr-1 h-4 w-4" />}
        {children}
      </Link>
    </Button>
  );
}

export function CreateLink({
  children,
  ...props
}: Omit<ButtonLinkProps, "Icon">) {
  return (
    <ButtonLink Icon={PlusCircle} {...props}>
      {children}
    </ButtonLink>
  );
}
