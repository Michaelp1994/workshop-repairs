import { Button } from "@repo/ui/button";
import {
  DataTableColumnHeader,
  DataTableHeaderCheckbox,
  DataTableRowCheckbox,
} from "@repo/ui/data-table";
import { ChevronRight } from "@repo/ui/icons";
import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "~/utils/formatDate";

import type { RouterOutputs } from "../../../../../backend/src/router";
const columnHelper =
  createColumnHelper<RouterOutputs["clients"]["getAll"][number]>();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row, getValue }) => (
      <Link
        className="font-bold hover:underline"
        params={{ clientId: row.original.id }}
        to="/clients/$clientId"
      >
        {getValue()}
      </Link>
    ),
    meta: {
      name: "Name",
    },
  }),

  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: (info) => formatDate(info.getValue()),
    meta: {
      name: "Date Created",
    },
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
    id: "id",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button asChild size="sm" variant="ghost">
          <Link params={{ clientId: row.original.id }} to="/clients/$clientId">
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>
    ),
  }),
];
