import type { RouterOutputs } from "@repo/backend/router";

import { Badge } from "@repo/ui/badge";
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

import RepairStatusBadge from "../../RepairStatusBadge";

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
        <Link
          className="font-bold hover:underline"
          params={{ repairId: getValue() }}
          to="/repairs/$repairId"
        >
          {getValue()}
        </Link>
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
      <div className="flex justify-end">
        <Button asChild size="sm" variant="ghost">
          <Link params={{ repairId: row.original.id }} to="/repairs/$repairId">
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>
    ),
  }),
];
