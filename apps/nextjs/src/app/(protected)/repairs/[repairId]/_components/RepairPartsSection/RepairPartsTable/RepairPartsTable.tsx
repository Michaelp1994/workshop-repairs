"use client";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@repo/ui/toggle-group";

import { api } from "~/trpc/react";

interface RepairPartsTableProps {
  repairId: RepairID;
}

export default function RepairPartsTable({ repairId }: RepairPartsTableProps) {
  const { data, isLoading, isError } =
    api.repairParts.getAllByRepairId.useQuery({ id: repairId });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Error loading repairs</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Part Number</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="w-[100px]">Installed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((part) => (
          <TableRow>
            <TableCell className="font-semibold">
              {part.parts.partNumber}
              {part.parts.name}
            </TableCell>
            <TableCell>
              <Label className="sr-only" htmlFor="price-1">
                Quantity
              </Label>
              <Input type="number" value={part.repair_parts.quantity} />
            </TableCell>
            <TableCell>
              <ToggleGroup defaultValue={true} type="single" variant="outline">
                <ToggleGroupItem value={true}>Yes</ToggleGroupItem>
                <ToggleGroupItem value={false}>No</ToggleGroupItem>
              </ToggleGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
