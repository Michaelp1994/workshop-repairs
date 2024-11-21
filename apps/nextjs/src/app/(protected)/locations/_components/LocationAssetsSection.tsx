"use client";
import type { LocationID } from "@repo/validators/ids.validators";

import { Card, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "../../assets/_components/AssetsTable/columns";

interface LocationAssetsSectionProps {
  locationId: LocationID;
}

export default function LocationRepairsSection({
  locationId,
}: LocationAssetsSectionProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [assets] = api.assets.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      locationId,
    },
  });

  const [rowCount] = api.assets.countAll.useSuspenseQuery({
    ...countState,
    filters: {
      locationId,
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <DataTable
        columns={columns}
        data={assets}
        rowCount={rowCount}
        tableState={tableState}
      />
    </Card>
  );
}
