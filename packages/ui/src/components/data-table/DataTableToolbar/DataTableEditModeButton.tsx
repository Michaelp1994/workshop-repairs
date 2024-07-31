import { type Table } from "@tanstack/react-table";
import { useState } from "react";
import { Toggle } from "../../toggle";
interface DataTableViewOptionsProps<T> {
  table: Table<T>;
}

export default function DataTableEditModeButton<T>({
  table,
}: DataTableViewOptionsProps<T>) {
  const [checked, setChecked] = useState(false);

  return (
    <Toggle
      pressed={checked}
      onPressedChange={(pressed) => {
        setChecked(pressed);
      }}
    >
      Edit Mode
    </Toggle>
  );
}
