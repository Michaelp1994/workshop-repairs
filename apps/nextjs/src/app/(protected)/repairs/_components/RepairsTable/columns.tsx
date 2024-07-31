import type { RouterOutputs } from "@repo/api/root";

import { Badge } from "@repo/ui/badge";
import { DataTableColumnHeader, DataTableImageCell } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { DataTableRowActions } from "@repo/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "~/utils/formatDate";
import { getBaseUrl } from "~/utils/getBaseUrl";

const columnHelper =
  createColumnHelper<RouterOutputs["repairs"]["getAll"][number]>();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("asset.imageUrl", {
    id: "image",
    header: "",
    cell: ({ getValue }) => (
      <DataTableImageCell alt="" url={getValue() ?? "/placeholder.svg"} />
    ),
    meta: {
      name: "Image",
    },
  }),
  columnHelper.accessor("asset.assetNumber", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset Number" />
    ),
    meta: {
      name: "Asset",
    },
  }),
  columnHelper.accessor("asset.serialNumber", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serial Number" />
    ),
    meta: {
      name: "Serial",
    },
  }),
  columnHelper.accessor("status", {
    header: "Current Status",
    cell: ({ getValue }) => <Badge>{getValue().name}</Badge>,
    meta: {
      name: "Current Status",
    },
  }),
  columnHelper.accessor("fault", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fault" />
    ),
    meta: {
      name: "Fault",
    },
  }),

  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    meta: {
      name: "Date Created",
    },
    cell: (info) => formatDate(info.getValue()),
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
        generateUrl={(row) => `${getBaseUrl()}/repairs/${row.original.id}`}
        row={row}
      />
    ),
  }),
];
