import type { RouterOutputs } from "@repo/api/router";

import { DataTableColumnHeader } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { DataTableRowActions } from "@repo/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "~/utils/formatDate";
import { getBaseUrl } from "~/utils/getBaseUrl";
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
      <DataTableRowActions
        generateUrl={(row) => `${getBaseUrl()}/parts/${row.original.id}`}
        row={row}
      />
    ),
  }),
];
