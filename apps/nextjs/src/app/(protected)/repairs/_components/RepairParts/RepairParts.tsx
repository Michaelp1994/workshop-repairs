"use client";
import {
  Card,
  CardHeader,
  CardHeaderActions,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import {
  DataTableCore,
  DataTableFooter,
  DataTableToolbar,
} from "@repo/ui/data-table";
import { useDataTable, useDataTableState } from "@repo/ui/hooks/use-data-table";
import { type RepairID } from "@repo/validators/ids.validators";

import { IconButton } from "~/components/IconButton";
import { api } from "~/trpc/client";

import { columns } from "./columns";

interface RepairPartsProps {
  repairId: RepairID;
}

export default function RepairParts({ repairId }: RepairPartsProps) {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      createdAt: false,
      updatedAt: false,
      createdBy: false,
      updatedBy: false,
    },
  });

  const [allRepairParts] = api.repairParts.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      repairId,
    },
  });

  const [rowCount] = api.repairParts.countAll.useSuspenseQuery({
    ...countState,
    filters: {
      repairId,
    },
  });

  const table = useDataTable({
    columns,
    data: allRepairParts,
    rowCount,
    ...tableState,
  });
  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Parts</CardTitle>
        </CardHeaderText>
        <CardHeaderActions>
          <IconButton href={`/repairs/${repairId}/parts/new`} variant="create">
            Add Part
          </IconButton>
        </CardHeaderActions>
      </CardHeader>
      <DataTableToolbar table={table} />
      <DataTableCore table={table} />
      <DataTableFooter table={table} />
    </Card>
  );
}
