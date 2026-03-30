import type { RouterOutputs } from "@repo/backend/router";

import { Button } from "@repo/ui/button";
import {
  DataTableColumnHeader,
  DataTableHeaderCheckbox,
  DataTableImageCell,
  DataTableRowCheckbox,
} from "@repo/ui/data-table";
import { ChevronRight } from "@repo/ui/icons";
import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "~/utils/formatDate";

const columnHelper =
  createColumnHelper<RouterOutputs["models"]["getAll"][number]>();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("defaultImageUrl", {
    header: "",
    cell: ({ getValue, row }) => (
      <DataTableImageCell
        alt={row.original.name}
        url={getValue() ?? "/placeholder.svg"}
      />
    ),
    meta: {
      name: "Image",
    },
  }),
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ getValue }) => (
      <Link
        className="font-bold hover:underline"
        params={{ modelId: getValue() }}
        to="/models/$modelId"
      >
        {getValue()}
      </Link>
    ),
    meta: {
      name: "Name",
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
  columnHelper.accessor("equipmentType.name", {
    id: "equipmentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equipment Type" />
    ),
    meta: {
      name: "Equipment Type",
    },
  }),
  columnHelper.accessor("manufacturer.name", {
    id: "manufacturer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manufacturer" />
    ),
    meta: {
      name: "Manufacturer",
    },
  }),

  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ getValue }) => formatDate(getValue()),
    meta: {
      name: "Date Created",
    },
  }),

  columnHelper.accessor("updatedAt", {
    id: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Updated" />
    ),
    cell: ({ getValue }) => formatDate(getValue()),
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
          <Link params={{ modelId: row.original.id }} to="/models/$modelId">
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>
    ),
  }),
];
