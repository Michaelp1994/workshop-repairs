import type { RouterOutputs } from "@repo/api/router";

import { Badge } from "@repo/ui/badge";
import { DataTableColumnHeader, DataTableLinkCell } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { DataTableRowActions } from "@repo/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "~/utils/formatDate";
import generateRepairSlug from "~/utils/generateRepairSlug";
import { getBaseUrl } from "~/utils/getBaseUrl";

import RepairStatusBadge from "../RepairStatusBadge";

const columnHelper =
  createColumnHelper<RouterOutputs["repairs"]["getAll"][number]>();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("id", {
    id: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Repair" />
    ),
    cell: ({ getValue }) => {
      return (
        <DataTableLinkCell href={`/repairs/${getValue()}`}>
          {generateRepairSlug(getValue())}
        </DataTableLinkCell>
      );
    },
    meta: {
      name: "Repair",
    },
  }),

  columnHelper.accessor("asset.assetNumber", {
    id: "assetNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset Number" />
    ),
    meta: {
      name: "Asset",
    },
  }),
  columnHelper.accessor("asset.serialNumber", {
    id: "serialNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serial Number" />
    ),
    meta: {
      name: "Serial",
    },
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "Current Status",
    cell: ({ getValue }) => <RepairStatusBadge status={getValue()} />,
    meta: {
      name: "Current Status",
    },
  }),
  columnHelper.accessor("type", {
    id: "type",
    header: "Type",
    cell: ({ getValue }) => <Badge variant="outline">{getValue().name}</Badge>,
    meta: {
      name: "Repair Type",
    },
  }),
  columnHelper.accessor("client.name", {
    id: "client",
    header: "Client",
    meta: {
      name: "Client",
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DataTableRowActions
        generateUrl={(row) => `${getBaseUrl()}/repairs/${row.original.id}`}
        row={row}
      />
    ),
  }),
];
