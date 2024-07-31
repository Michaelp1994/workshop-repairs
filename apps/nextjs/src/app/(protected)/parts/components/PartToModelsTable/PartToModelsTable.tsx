"use client";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
} from "@repo/ui/data-table";
import { PlusCircle } from "@repo/ui/icons";
import { type PartID } from "@repo/validators/ids.validators";
import Link from "next/link";

import { usePartToModelsTable } from "./usePartToModelsTable";

interface PartToModelsTableProps {
  partId: PartID;
}

export default function PartToModelsTable({ partId }: PartToModelsTableProps) {
  const { table, isLoading, isError } = usePartToModelsTable({
    partId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading models</div>;
  }

  return (
    <div>
      <div>
        <Button asChild>
          <Link href="/models/new">
            <PlusCircle className="h-4 w-4" />
            Create Model
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Models</CardTitle>
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
