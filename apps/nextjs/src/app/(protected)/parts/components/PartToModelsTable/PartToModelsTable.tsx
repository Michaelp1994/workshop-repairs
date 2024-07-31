"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
} from "@repo/ui/data-table";
import { PlusCircle } from "@repo/ui/icons";
import { usePartToModelsTable } from "./usePartToModelsTable";
import { type PartID } from "@repo/validators/ids.validators";
import { Button } from "@repo/ui/button";

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
