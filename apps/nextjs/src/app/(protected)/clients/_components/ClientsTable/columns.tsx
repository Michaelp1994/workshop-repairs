import type { RouterOutputs } from "@repo/api/router";

import { DataTableColumnHeader, DataTableLinkCell } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { DataTableRowActions } from "@repo/ui/data-table";
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
  columnHelper.accessor("name", {
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row, getValue }) => (
      <DataTableLinkCell href={`/clients/${row.original.id}`}>
        {getValue()}
      </DataTableLinkCell>
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
      <DataTableRowActions
        generateUrl={(row) => `/clients/${row.original.id}`}
        row={row}
      />
    ),
  }),
];
