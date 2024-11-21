"use client";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";
import { PlusCircle } from "@repo/ui/icons";
import Link from "next/link";

import { IconButton } from "~/components/IconButton";
import { api } from "~/trpc/client";

import { columns } from "../../repairs/_components/RepairsTable/columns";

interface AssetRepairsTableProps {
  assetId: number;
}

export default function AssetRepairsTable({ assetId }: AssetRepairsTableProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [repairs] = api.repairs.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      assetId,
    },
  });

  const [rowCount] = api.repairs.countAll.useSuspenseQuery({
    ...countState,
    filters: {
      assetId,
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Repairs</CardTitle>
        </div>
        <div>
          <IconButton href={`/repairs/new?assetId=${assetId}`} variant="create">
            Add Repair
          </IconButton>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={repairs}
          rowCount={rowCount}
          tableState={tableState}
        />
      </CardContent>
    </Card>
  );
}