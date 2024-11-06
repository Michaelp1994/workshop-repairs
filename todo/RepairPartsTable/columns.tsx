import type { RouterOutputs } from "@repo/api/router";
import { createColumnHelper } from "@tanstack/react-table";
import { formatDate } from "~/utils/formatDate";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { DataTableColumnHeader } from "@repo/ui/data-table";
import { DataTableRowActions } from "@repo/ui/data-table";
const columnHelper =
  createColumnHelper<
    RouterOutputs["repairParts"]["getAllByRepairId"][number]
  >();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("parts.name", {
    header: "Part Name",
    meta: {
      name: "Part Name",
    },
  }),
  columnHelper.accessor("parts.partNumber", {
    header: "Part Number",
    meta: {
      name: "Part Number",
    },
  }),

  columnHelper.accessor("repair_parts.quantity", {
    header: "Quantity",
    meta: {
      name: "Quantity",
    },
  }),

  columnHelper.accessor("repair_parts.installed", {
    header: "Installed",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
    meta: {
      name: "Installed",
    },
  }),

  columnHelper.accessor("createdBy.firstName", {
    header: "Added by",
    meta: {
      name: "Added By",
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
];
