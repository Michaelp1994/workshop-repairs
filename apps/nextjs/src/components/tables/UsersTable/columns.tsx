import type { RouterOutputs } from "@repo/api/router";

import { DataTableColumnHeader } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { DataTableRowActions } from "@repo/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper =
  createColumnHelper<RouterOutputs["users"]["getAll"][number]>();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("firstName", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    meta: {
      name: "First Name",
    },
  }),

  columnHelper.accessor("lastName", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    meta: {
      name: "Last Name",
    },
  }),

  columnHelper.display({
    id: "id",
    enableHiding: false,
    cell: ({ row }) => (
      <DataTableRowActions
        generateUrl={(row) => `users/${row.original.id}`}
        row={row}
      />
    ),
  }),
];
