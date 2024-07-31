import { type Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "../../button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";

interface DataTableFooterProps<T> {
  table: Table<T>;
}

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

export function DataTableFooter<T>({ table }: DataTableFooterProps<T>) {
  const rowSelection = table.getState().rowSelection;
  const totalSelected = Object.keys(rowSelection).length;
  const totalRows = table.getRowCount();
  return (
    <div className="align-center flex justify-between py-4">
      <div className="flex items-center gap-2">
        {totalSelected} of {totalRows} Total Rows Selected
        {table.getIsSomeRowsSelected() && (
          <Button
            onClick={() => {
              table.resetRowSelection();
            }}
            size="sm"
            variant="outline"
          >
            Clear Selection
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div>Rows per page</div>
        <Select
          onValueChange={(value) => {
            table.setPageSize(Number(value));
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
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.firstPage();
          }}
          size="sm"
          variant="outline"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage();
          }}
          size="sm"
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage();
          }}
          size="sm"
          variant="outline"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.lastPage();
          }}
          size="sm"
          variant="outline"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
