"use client";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";
import { PlusCircle } from "@repo/ui/icons";
import { type ModelID } from "@repo/validators/ids.validators";
import Link from "next/link";

import { api } from "~/trpc/client";

import { columns } from "./columns";

interface ModelPartsTableProps {
  modelId: ModelID;
}

export default function ModelPartsTable({ modelId }: ModelPartsTableProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [parts] = api.partsToModels.getAllPartsByModelId.useSuspenseQuery({
    ...dataState,
    filters: {
      modelId,
    },
  });

  const [rowCount] = api.partsToModels.countAllPartsByModelId.useSuspenseQuery({
    ...countState,
    filters: {
      modelId,
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Parts</CardTitle>
        <Button asChild size="icon" variant="link">
          <Link href={`/models/${modelId}/parts/new`}>
            <PlusCircle />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={parts}
          getRowId={(row) => row.partId.toString()}
          rowCount={rowCount}
          tableState={tableState}
        />
      </CardContent>
    </Card>
  );
}
