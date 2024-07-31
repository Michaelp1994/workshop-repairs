"use client";

import { Check, ChevronsUpDown } from "lucide-react";
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

interface ComboboxOption {
  label: string;
  value: string | number;
}

export interface ComboboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  data: ComboboxOption[] | undefined;
  onChange: (value: string | number | null) => void;
  isLoading?: boolean;
}

export const Combobox = React.forwardRef<
  React.ElementRef<typeof Button>,
  ComboboxProps
>(({ onChange, isLoading, value, className, data = [], ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  function handleSelect(newValue: string) {
    onChange(Number(newValue) === value ? null : Number(newValue));
    setOpen(false);
  }

  const selectedOption = React.useMemo(
    () => data.find((option) => option.value === value),
    [value, data],
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className={cn("flex w-full justify-between", className)}
          role="combobox"
          variant="outline"
          {...props}
          ref={ref}
        >
          {selectedOption ? selectedOption.label : "Select option..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {data.map((option) => (
                <CommandItem
                  key={option.value}
                  keywords={[option.label]}
                  onSelect={handleSelect}
                  value={option.value.toString()}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
