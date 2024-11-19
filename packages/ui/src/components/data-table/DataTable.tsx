import { DataTableCore } from "./DataTableCore/DataTableCore";
import { DataTableFooter } from "./DataTableFooter";
import { DataTableToolbar } from "./DataTableToolbar";
import { useDataTable } from "./useDataTable";

export default function DataTable({ columns, data, rowCount, tableState }) {
  const table = useDataTable({
    columns,
    data,
    rowCount,
    ...tableState,
  });

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTableCore table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
