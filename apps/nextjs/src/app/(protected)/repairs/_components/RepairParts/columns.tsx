import type { RouterOutputs } from "@repo/api/router";

import { Button } from "@repo/ui/button";
import { DataTableColumnHeader } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { CheckIcon, Pencil, Trash2 } from "@repo/ui/icons";
import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "~/utils/formatDate";

const columnHelper =
  createColumnHelper<RouterOutputs["repairParts"]["getAll"][number]>();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("part.partNumber", {
    id: "partNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Part Number" />
    ),
    meta: {
      name: "Part Number",
    },
  }),

  columnHelper.accessor("part.name", {
    id: "partName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Part Name" />
    ),
    meta: {
      name: "Part Name",
    },
  }),
  columnHelper.accessor("quantity", {
    id: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    meta: {
      name: "Quantity",
    },
  }),
  columnHelper.accessor("installed", {
    id: "installed",
    header: "Installed",
    meta: {
      name: "Installed",
    },
    cell: (info) =>
      info.getValue() && (
        <div className="flex items-center justify-center">
          <CheckIcon className="h-5 w-5" />
        </div>
      ),
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    meta: {
      name: "Date Created",
    },
    cell: (info) => formatDate(info.getValue()),
  }),

  columnHelper.accessor("updatedAt", {
    id: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Updated" />
    ),
    cell: (info) => formatDate(info.getValue()),
    meta: {
      name: "Date Updated",
    },
  }),
  columnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <>
        <Button size="sm" variant="link">
          <Pencil className="h-5 w-5" />
        </Button>
        <Button size="sm" variant="link">
          <Trash2 className="h-5 w-5" />
        </Button>
      </>
    ),
  }),
];
