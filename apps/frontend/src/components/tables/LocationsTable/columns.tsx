import {
  DataTableColumnHeader,
  DataTableHeaderCheckbox,
  DataTableRowActions,
  DataTableRowCheckbox,
} from "@repo/ui/data-table";
import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "~/utils/formatDate";

import type { RouterOutputs } from "../../../../../backend/src/router";
const columnHelper =
  createColumnHelper<RouterOutputs["locations"]["getAll"][number]>();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ getValue, row }) => (
      <Link
        className="font-bold hover:underline"
        params={{ locationId: row.original.id }}
        to="/locations/$locationId"
      >
        {getValue()}
      </Link>
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
      <DataTableRowActions
        generateUrl={(row) => `/locations/${row.original.id}`}
        row={row}
      />
    ),
  }),
];
