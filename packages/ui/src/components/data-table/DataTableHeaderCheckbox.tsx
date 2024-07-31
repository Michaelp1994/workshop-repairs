import { Checkbox } from "../checkbox";
import { type Table } from "@tanstack/react-table";

interface DataTableHeaderCheckboxProps<T> {
  table: Table<T>;
}

export function DataTableHeaderCheckbox<T>({
  table,
}: DataTableHeaderCheckboxProps<T>) {
  return (
    <Checkbox
      checked={
        table.getIsAllRowsSelected()
          ? true
          : table.getIsSomeRowsSelected()
            ? "indeterminate"
            : false
      }
      onCheckedChange={(checked) => {
        if (checked === "indeterminate") {
          table.toggleAllRowsSelected(undefined);
          return;
        }
        table.toggleAllRowsSelected(checked);
      }}
    />
  );
}
