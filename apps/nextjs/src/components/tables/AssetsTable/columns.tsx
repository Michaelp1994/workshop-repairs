import type { RouterOutputs } from "@repo/api/root";

import { Badge } from "@repo/ui/badge";
import { DataTableColumnHeader } from "@repo/ui/data-table";
import { DataTableRowActions } from "@repo/ui/data-table";
import { DataTableImageCell } from "@repo/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "~/utils/formatDate";
import { getBaseUrl } from "~/utils/getBaseUrl";

type Row = RouterOutputs["assets"]["getAll"][number];

const columnHelper = createColumnHelper<Row>();

export const columns = [
  // columnHelper.display({
  //   id: "selection",
  //   enableHiding: false,
  //   header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
  //   cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  // }),
  columnHelper.accessor("model.imageUrl", {
    id: "image",
    header: "",
    cell: ({ getValue }) => (
      <DataTableImageCell alt="" url={getValue() ?? "/placeholder.svg"} />
    ),
    meta: {
      name: "Image",
    },
  }),
  columnHelper.accessor("assetNumber", {
    id: "assetNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset Number" />
    ),
    meta: {
      name: "Asset Number",
    },
  }),
  columnHelper.accessor("serialNumber", {
    id: "serialNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serial Number" />
    ),
    meta: {
      name: "Serial Number",
    },
  }),
  columnHelper.accessor("status.name", {
    id: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ getValue }) => (
      <div style={{ display: "flex" }}>
        <Badge variant="outline">{getValue()}</Badge>
      </div>
    ),
    meta: {
      name: "Status",
    },
  }),
  columnHelper.accessor("model.nickname", {
    id: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
    meta: {
      name: "Model",
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
  columnHelper.accessor("client.name", {
    id: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    meta: {
      name: "Client",
    },
  }),

  columnHelper.accessor("location.name", {
    id: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    meta: {
      name: "Location",
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DataTableRowActions
        generateUrl={(row) => `${getBaseUrl()}/assets/${row.original.id}`}
        row={row}
      />
    ),
  }),
];
