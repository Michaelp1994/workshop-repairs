"use client";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";
import { PlusCircle } from "@repo/ui/icons";
import Link from "next/link";

import { api } from "~/trpc/client";

import { columns } from "../../repairs/_components/RepairsTable/columns";

interface AssetRepairsSectionProps {
  assetId: number;
}

export default function AssetRepairsSection({
  assetId,
}: AssetRepairsSectionProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [repairs] = api.repairs.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      assetId,
    },
  });

  const [rowCount] = api.repairs.getCount.useSuspenseQuery({
    ...countState,
    filters: {
      assetId,
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Repairs</CardTitle>
        </div>
        <div>
          <Button asChild size="sm" variant="ghost">
            <Link href={`/repairs/new?assetId=${assetId}`}>
              <PlusCircle className="mr-1 h-4 w-4" />
              Add Repair
            </Link>
          </Button>
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
