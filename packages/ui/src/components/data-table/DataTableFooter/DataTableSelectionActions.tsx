"use client";
import type { Table } from "@tanstack/react-table";

import { Button } from "../../button";

interface DataTableSelectionActionsProps<T> {
  table: Table<T>;
}

export default function DataTableSelectionActions<T>({
  table,
}: DataTableSelectionActionsProps<T>) {
  const rowSelection = table.getState().rowSelection;
  const totalSelected = Object.keys(rowSelection).length;
  const totalRows = table.getRowCount();
  return (
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
  );
}
