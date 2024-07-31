"use client";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";
import { type ManufacturerID } from "@repo/validators/ids.validators";

import { api } from "~/trpc/react";
import {
  defaultCountQueryOptns,
  defaultDataQueryOptns,
} from "~/utils/defaultQueryOptns";

import { columns } from "./columns";

interface ModelsTableProps {
  manufacturerId?: ManufacturerID;
}

export default function ModelsTable({ manufacturerId }: ModelsTableProps) {
  const { dataState, countState, tableOptions } = useDataTableState();

  const { data, isLoading, isError, error } = api.models.getAll.useQuery(
    dataState,
    defaultDataQueryOptns,
  );

  const { data: rowCount } = api.models.getCount.useQuery(
    countState,
    defaultCountQueryOptns,
  );

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
    return <div>Error loading models</div>;
  }

  return (
    <>
      <DataTableToolbar table={table} />

      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
