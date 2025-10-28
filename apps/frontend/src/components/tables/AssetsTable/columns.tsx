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
import generateAssetSlug from "~/utils/generateAssetSlug";

import type { RouterOutputs } from "../../../../../backend/src/router";

type Row = RouterOutputs["assets"]["getAll"][number];

const columnHelper = createColumnHelper<Row>();

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
      <DataTableColumnHeader column={column} title="Asset" />
    ),
    cell: ({ getValue }) => {
      return (
        <Link
          className="font-bold hover:underline"
          params={{ assetId: getValue() }}
          to="/assets/$assetId"
        >
          {generateAssetSlug(getValue())}
        </Link>
      );
    },
    meta: {
      name: "Asset",
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
  columnHelper.accessor("model", {
    id: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
    cell: ({ getValue }) => {
      const model = getValue();
      return (
        <>
          <div className="font-semibold">{model.name}</div>
          <div className="text-muted-foreground">{model.manufacturer}</div>
        </>
      );
    },
    meta: {
      name: "Model",
    },
  }),
  columnHelper.accessor("client.name", {
    id: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
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
      <div className="flex justify-end">
        <Button asChild size="sm" variant="ghost">
          <Link params={{ assetId: row.original.id }} to="/assets/$assetId">
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>
    ),
  }),
];
