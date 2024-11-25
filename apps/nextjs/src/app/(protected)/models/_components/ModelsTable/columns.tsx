import type { RouterOutputs } from "@repo/api/router";

import { DataTableColumnHeader, DataTableLinkCell } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { DataTableRowActions } from "@repo/ui/data-table";
import { DataTableImageCell } from "@repo/ui/data-table";
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
    cell: ({ getValue }) => (
      <DataTableImageCell url={getValue() ?? "/placeholder.svg"} />
    ),
    meta: {
      name: "Image",
    },
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ getValue, row }) => (
      <DataTableLinkCell href={`/models/${row.original.id}`}>
        {getValue()}
      </DataTableLinkCell>
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
      <DataTableRowActions
        generateUrl={(row) => `/models/${row.original.id}`}
        row={row}
      />
    ),
  }),
];
