"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { CommandLoading } from "cmdk";
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

interface Data {
  pageParams: (number | null)[];
  pages: {
    data: ComboboxOption[];
    nextCursor: number | undefined;
  }[];
}

export interface ComboboxProps
  extends Omit<React.ComponentProps<"button">, "onChange"> {
  data: Data | undefined;
  onChange: (value: string | number | null) => void;
  isLoading?: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export const InfiniteCombobox = ({
  ref,
  onChange,
  value,
  fetchNextPage,
  isFetchingNextPage,
  isLoading,
  className,
  data,
  ...props
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const parentRef = React.useRef<HTMLDivElement | null>(null);
  const allRows = data ? data.pages.flatMap((d) => d.data) : [];
  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: allRows.length,
    getScrollElement: () => parentRef.current,

    estimateSize: () => 35,
    overscan: 5,
  });

  function handleSelect(newValue: string) {
    onChange(Number(newValue) === value ? null : Number(newValue));
    setOpen(false);
  }

  const selectedOption = React.useMemo(
    () => allRows.find((option) => option.value === value),
    [value, allRows],
  );

  function handleScroll() {
    const scrollContainer = parentRef.current;
    if (scrollContainer) {
      const isAtBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop ===
        scrollContainer.clientHeight;

      if (isAtBottom && fetchNextPage && !isFetchingNextPage) {
        console.log("fetching next page");
        fetchNextPage();
      }
    }
  }

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
          <CommandList onScroll={handleScroll} ref={parentRef}>
            {isLoading && <CommandLoading>Loading...</CommandLoading>}
            <CommandGroup>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = allRows[virtualRow.index];
                if (!row) return null;
                return (
                  <CommandItem
                    key={row.value}
                    keywords={[row.label]}
                    onSelect={handleSelect}
                    value={row.value.toString()}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === row.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {row.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

InfiniteCombobox.displayName = "InfiniteCombobox";
