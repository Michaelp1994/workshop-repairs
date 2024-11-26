"use client";
import {
  Card,
  CardHeader,
  CardHeaderActions,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";
import { type RepairID } from "@repo/validators/ids.validators";

import { IconButton } from "~/app/(protected)/_components/IconButton";
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

  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Parts</CardTitle>
        </CardHeaderText>
        <CardHeaderActions>
          <IconButton
            href={`/repairs/${repairId}/parts/new`}
            scroll={false}
            variant="create"
          >
            Add Part
          </IconButton>
        </CardHeaderActions>
      </CardHeader>
      <DataTable
        columns={columns}
        data={allRepairParts}
        rowCount={rowCount}
        {...tableState}
      />
    </Card>
  );
}
