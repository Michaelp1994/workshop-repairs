import { Button } from "../button";
import { SlidersHorizontal } from "../icons";
import { type Table } from "@tanstack/react-table";

interface DataTableResetButtonProps<T> {
  table: Table<T>;
}

export function DataTableResetButton<T>({
  table,
}: DataTableResetButtonProps<T>) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        table.resetPageIndex();
        table.resetPagination();
        // table.resetColumnVisibility();
        table.resetGlobalFilter();
        table.resetRowSelection();
        table.resetSorting();
        // table.resetColumnFilters();
        // table.reset();
      }}
    >
      <SlidersHorizontal className="h-4 w-4" />
      Reset
    </Button>
  );
}
