"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import { CheckIcon, Pencil, Trash2 } from "@repo/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import Link from "next/link";

import { api } from "~/trpc/client";
import { getBaseUrl } from "~/utils/getBaseUrl";

interface RepairPartsTableProps {
  repairId: RepairID;
}

export default function RepairPartsTable({ repairId }: RepairPartsTableProps) {
  const [repairParts] = api.repairParts.getAllByRepairId.useSuspenseQuery({
    id: repairId,
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Part Number</TableHead>
          <TableHead>Part Name</TableHead>
          <TableHead className="w-[100px] text-center">Quantity</TableHead>
          <TableHead className="w-[100px] text-center">Installed</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {repairParts.map((repairPart) => (
          <TableRow key={repairPart.id}>
            <TableCell className="font-semibold">
              <span className="mr-2">{repairPart.part.partNumber}</span>
            </TableCell>
            <TableCell>
              <span>{repairPart.part.name}</span>
            </TableCell>
            <TableCell className="text-center">{repairPart.quantity}</TableCell>
            <TableCell className="text-center">
              {repairPart.installed && (
                <div className="flex items-center justify-center">
                  <CheckIcon className="h-5 w-5" />
                </div>
              )}
            </TableCell>
            <TableCell>
              <Button asChild variant="link">
                <Link
                  href={`${getBaseUrl()}/repairs/${repairId}/parts/${repairPart.id}`}
                >
                  <Pencil className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link
                  href={`${getBaseUrl()}/repairs/${repairId}/parts/${repairPart.id}/archive`}
                >
                  <Trash2 className="h-5 w-5" />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
