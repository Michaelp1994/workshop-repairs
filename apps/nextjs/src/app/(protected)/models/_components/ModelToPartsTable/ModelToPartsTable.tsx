"use client";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
} from "@repo/ui/data-table";
import { PlusCircle } from "@repo/ui/icons";
import { type ModelID } from "@repo/validators/ids.validators";
import Link from "next/link";

import { useModelToPartsTable } from "./useModelToPartsTable";

interface ModelToPartsTableProps {
  modelId: ModelID;
}

export default function ModelsTable({ modelId }: ModelToPartsTableProps) {
  const { table, isLoading, isError } = useModelToPartsTable({
    modelId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading parts</div>;
  }

  return (
    <div>
      <div>
        <Button asChild>
          <Link href="/models/new">
            <PlusCircle className="h-4 w-4" />
            Add Model
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Parts</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTableToolbar table={table} />
          <DataTable table={table} />
          <DataTableFooter table={table} />
        </CardContent>
      </Card>
    </div>
  );
}
