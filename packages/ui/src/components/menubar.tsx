"use client";

import type { CheckedState } from "@radix-ui/react-checkbox";
export type { MenubarMenuProps } from "@radix-ui/react-menubar";

import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Menu,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";

const MenubarMenu: typeof Menu = Menu;

const MenubarGroup = Group;

const MenubarPortal = Portal;

const MenubarSub = Sub;

const MenubarRadioGroup = RadioGroup;

const Menubar = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Root> & {
  ref: React.RefObject<React.ComponentRef<typeof Root>>;
}) => (
  <Root
    className={cn(
      "bg-background flex h-10 items-center space-x-1 rounded-md border p-1",
      className,
    )}
    ref={ref}
    {...props}
  />
);
Menubar.displayName = Root.displayName;

const MenubarTrigger = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Trigger> & {
  ref: React.RefObject<React.ComponentRef<typeof Trigger>>;
}) => (
  <Trigger
    className={cn(
      "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none",
      className,
    )}
    ref={ref}
    {...props}
  />
);
MenubarTrigger.displayName = Trigger.displayName;

const MenubarSubTrigger = ({ ref, className, inset, children, ...props }) => (
  <SubTrigger
    className={cn(
      "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      inset && "pl-8",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </SubTrigger>
);
MenubarSubTrigger.displayName = SubTrigger.displayName;

const MenubarSubContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SubContent> & {
  ref: React.RefObject<React.ComponentRef<typeof SubContent>>;
}) => (
  <SubContent
    className={cn(
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1",
      className,
    )}
    ref={ref}
    {...props}
  />
);
MenubarSubContent.displayName = SubContent.displayName;

const MenubarContent = ({
  ref,
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentPropsWithoutRef<typeof Content> & {
  ref: React.RefObject<React.ComponentRef<typeof Content>>;
}) => (
  <Portal>
    <Content
      align={align}
      alignOffset={alignOffset}
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md",
        className,
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </Portal>
);
MenubarContent.displayName = Content.displayName;

const MenubarItem = ({ ref, className, inset, ...props }) => (
  <Item
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    ref={ref}
    {...props}
  />
);
MenubarItem.displayName = Item.displayName;

const MenubarCheckboxItem = ({
  ref,
  className,
  children,
  checked,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxItem> & {
  ref: React.RefObject<React.ComponentRef<typeof CheckboxItem>>;
}) => (
  <CheckboxItem
    checked={checked as CheckedState}
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Check className="h-4 w-4" />
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
);
MenubarCheckboxItem.displayName = CheckboxItem.displayName;

const MenubarRadioItem = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioItem> & {
  ref: React.RefObject<React.ComponentRef<typeof RadioItem>>;
}) => (
  <RadioItem
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
);
MenubarRadioItem.displayName = RadioItem.displayName;

const MenubarLabel = ({ ref, className, inset, ...props }) => (
  <Label
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    ref={ref}
    {...props}
  />
);
MenubarLabel.displayName = Label.displayName;

const MenubarSeparator = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Separator> & {
  ref: React.RefObject<React.ComponentRef<typeof Separator>>;
}) => (
  <Separator
    className={cn("bg-muted -mx-1 my-1 h-px", className)}
    ref={ref}
    {...props}
  />
);
MenubarSeparator.displayName = Separator.displayName;

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
