"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
import Link from "next/link";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
} from "@repo/ui/data-table";
import { PlusCircle } from "@repo/ui/icons";
import { useRepairStatusTypesTable } from "./useRepairStatusTypesTable";
import { Button } from "@repo/ui/button";

export default function RepairStatusTypesTable() {
  const { table, isLoading, isError } = useRepairStatusTypesTable();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading Repair Status Types</div>;
  }

  return (
    <div>
      <div>
        <Button asChild>
          <Link href="/repairStatusTypes/new">
            <PlusCircle className="h-4 w-4" />
            <span>Create Repair Status Type</span>
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Repair Status Types</CardTitle>
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
