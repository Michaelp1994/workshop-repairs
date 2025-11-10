import type { RouterOutputs } from "@repo/backend/router";

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
const columnHelper =
  createColumnHelper<RouterOutputs["clients"]["getAll"][number]>();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("slug", {
    id: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ getValue }) => (
      <Link
        className="font-bold hover:underline"
        params={{ clientSlug: getValue() }}
        to="/clients/$clientSlug"
      >
        {getValue()}
      </Link>
    ),
    meta: {
      name: "Name",
    },
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
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
          <Link
            params={{ clientSlug: row.original.slug }}
            to="/clients/$clientSlug"
          >
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>
    ),
  }),
];
