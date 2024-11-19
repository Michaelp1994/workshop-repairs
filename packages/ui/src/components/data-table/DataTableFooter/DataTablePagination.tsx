"use client";
import type { Table } from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LoaderCircle,
} from "lucide-react";
import { useTransition } from "react";

import { Button } from "../../button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";

const viewOptions = [
  {
    value: "5",
    label: 5,
  },
  {
    value: "10",
    label: 10,
  },
  {
    value: "20",
    label: 20,
  },
  {
    value: "50",
    label: 50,
  },
  {
    value: "100",
    label: 100,
  },
];

interface DataTablePaginationProps<T> {
  table: Table<T>;
}

export default function DataTablePagination<T>({
  table,
}: DataTablePaginationProps<T>) {
  return (
    <div className="flex items-center gap-4">
      <div>Rows per page</div>
      <RowsPerPageSelect table={table} />
      <FirstPageButton table={table} />
      <PreviousPageButton table={table} />
      <NextPageButton table={table} />
      <LastPageButton table={table} />
    </div>
  );
}

function RowsPerPageSelect<T>({ table }: DataTablePaginationProps<T>) {
  const [isPending, startTransition] = useTransition();
  return (
    <Select
      onValueChange={(value) => {
        startTransition(() => {
          table.setPageSize(Number(value));
        });
      }}
      value={table.getState().pagination.pageSize.toString()}
    >
      <SelectTrigger className="w-24">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {viewOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function FirstPageButton<T>({ table }: DataTablePaginationProps<T>) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={!table.getCanPreviousPage()}
      onClick={() => {
        startTransition(() => {
          table.firstPage();
        });
      }}
      size="sm"
      variant="outline"
    >
      {isPending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <ChevronsLeft className="h-4 w-4" />
      )}
    </Button>
  );
}

function PreviousPageButton<T>({ table }: DataTablePaginationProps<T>) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={!table.getCanPreviousPage()}
      onClick={() => {
        startTransition(() => {
          table.previousPage();
        });
      }}
      size="sm"
      variant="outline"
    >
      {isPending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </Button>
  );
}

function NextPageButton<T>({ table }: DataTablePaginationProps<T>) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={!table.getCanNextPage()}
      onClick={() => {
        startTransition(() => {
          table.nextPage();
        });
      }}
      size="sm"
      variant="outline"
    >
      {isPending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </Button>
  );
}

function LastPageButton<T>({ table }: DataTablePaginationProps<T>) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={!table.getCanNextPage()}
      onClick={() => {
        startTransition(() => {
          table.lastPage();
        });
      }}
      size="sm"
      variant="outline"
    >
      {isPending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <ChevronsRight className="h-4 w-4" />
      )}
    </Button>
  );
}
