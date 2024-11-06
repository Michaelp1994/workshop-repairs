"use client";
import type { RepairID } from "@repo/validators/ids.validators";
import { columns } from "./columns";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  useDataTableState,
} from "@repo/ui/data-table";
import { api } from "~/trpc/client";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface RepairPartsTableProps {
  repairId: RepairID;
}

export default function RepairPartsTable({ repairId }: RepairPartsTableProps) {
  const { dataState, countState, tableOptions } =
    useDataTableState(initialState);

  const { data, isLoading, isError } =
    api.repairParts.getAllByRepairId.useQuery({ id: repairId });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Error loading repairs</div>;
  }

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
