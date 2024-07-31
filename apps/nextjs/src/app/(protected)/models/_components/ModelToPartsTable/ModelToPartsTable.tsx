"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
} from "@repo/ui/data-table";
import { PlusCircle } from "@repo/ui/icons";
import { useModelToPartsTable } from "./useModelToPartsTable";
import { type ModelID } from "@repo/validators/ids.validators";
import { Button } from "@repo/ui/button";

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
