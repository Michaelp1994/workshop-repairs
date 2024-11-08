"use client";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function EquipmentTypeTable() {
  const { dataState, countState, tableOptions } = useDataTableState();

  const { data, isLoading, isError } =
    api.equipmentTypes.getAll.useQuery(dataState);

  const { data: rowCount } = api.equipmentTypes.getCount.useQuery(countState);

  const table = useDataTable({
    columns,
    data,
    rowCount,
    ...tableOptions,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading manufacturers</div>;
  }

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
