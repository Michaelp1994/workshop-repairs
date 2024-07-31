import { Button } from "../../button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { type Table } from "@tanstack/react-table";

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
            variant="outline"
            size="sm"
            onClick={() => {
              table.resetRowSelection();
            }}
          >
            Clear Selection
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div>Rows per page</div>
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
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
          variant="outline"
          size="sm"
          onClick={() => {
            table.firstPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.lastPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
