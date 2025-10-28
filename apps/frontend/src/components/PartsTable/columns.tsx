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

import type { RouterOutputs } from "../../../../backend/src/router";
const columnHelper =
  createColumnHelper<RouterOutputs["parts"]["getAll"][number]>();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("partNumber", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Part Number" />
    ),
    cell: ({ getValue, row }) => (
      <Link
        className="font-bold hover:underline"
        params={{ partId: row.original.id }}
        to="/parts/$partId"
      >
        {getValue()}
      </Link>
    ),
    meta: {
      name: "Part Number",
    },
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    meta: {
      name: "Name",
    },
  }),

  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: (info) => formatDate(info.getValue()),
    meta: {
      name: "Date Created",
    },
  }),

  columnHelper.accessor("updatedAt", {
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
          <Link params={{ partId: row.original.id }} to="/parts/$partId">
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>
    ),
  }),
];
