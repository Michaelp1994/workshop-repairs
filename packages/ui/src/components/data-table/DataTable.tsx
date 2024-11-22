import { useDataTable } from "../../hooks/use-data-table";
import { DataTableCore } from "./DataTableCore/DataTableCore";
import { DataTableFooter } from "./DataTableFooter";
import { DataTableToolbar } from "./DataTableToolbar";

export default function DataTable({
  columns,
  data,
  rowCount,
  tableState,
  getRowId,
}) {
  const table = useDataTable({
    columns,
    data,
    rowCount,
    getRowId,
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
