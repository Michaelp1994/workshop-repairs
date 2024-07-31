import { Checkbox } from "../checkbox";
import { type Row } from "@tanstack/react-table";

interface DataTableRowCheckboxProps<T> {
  row: Row<T>;
}

export function DataTableRowCheckbox<T>({ row }: DataTableRowCheckboxProps<T>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onCheckedChange={() => {
        row.toggleSelected();
      }}
    />
  );
}
