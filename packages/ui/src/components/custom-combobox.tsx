"use client";

import { CommandLoading } from "cmdk";
import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface CustomComboboxProps<T>
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  data: T[] | undefined;
  onChange: (value: string | number | null) => void;
  isLoading?: boolean;
  children: React.ReactNode;
  Item: (props: { option: T; isSelected: boolean }) => React.ReactNode;
  SelectedItem: (props: { option: T }) => React.ReactNode;
}

interface BaseType {
  id: number;
  value: number;
}

function CustomComboboxFn<T extends BaseType>(
  {
    onChange,
    value,
    isLoading,
    Item,
    SelectedItem,
    className,
    data = [],
    ...props
  }: CustomComboboxProps<T>,
  ref: React.ElementRef<typeof Button>,
) {
  const [open, setOpen] = React.useState(false);

  function handleSelect(newValue: string) {
    onChange(Number(newValue) === value ? null : Number(newValue));
    setOpen(false);
  }

  const selectedOption = React.useMemo(
    () => data.find((option) => option.id === value),
    [value, data],
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className={cn("flex h-full w-full justify-between", className)}
          role="combobox"
          variant="outline"
          {...props}
          ref={ref}
        >
          {selectedOption ? (
            <SelectedItem option={selectedOption} />
          ) : (
            "Select option..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search..." />

          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandList>
            {isLoading && <CommandLoading>Loading...</CommandLoading>}
            <CommandGroup>
              {data?.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={handleSelect}
                  value={option.id.toString()}
                >
                  <Item isSelected={option.id === value} option={option} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const CustomCombobox = React.forwardRef<
  React.ElementRef<typeof Button>,
  CustomComboboxProps
>(CustomComboboxFn);

CustomCombobox.displayName = "CustomCombobox";
