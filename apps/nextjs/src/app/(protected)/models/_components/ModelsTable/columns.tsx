import type { RouterOutputs } from "@repo/api/root";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { formatDate } from "~/utils/formatDate";
import { DataTableRowActions } from "@repo/ui/data-table";
import { DataTableImageCell } from "@repo/ui/data-table";

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
    cell: ({ getValue }) => getValue(),
    meta: {
      name: "Name",
    },
  }),
  columnHelper.accessor("nickname", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nickname" />
    ),
    meta: {
      name: "Nickname",
    },
  }),
  columnHelper.accessor("manufacturer.name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manufacturer" />
    ),
    meta: {
      name: "Manufacturer",
    },
  }),

  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ getValue }) => formatDate(getValue()),
    meta: {
      name: "Date Created",
    },
  }),

  columnHelper.accessor("updatedAt", {
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
        generateUrl={(row) => `models/${row.original.id}`}
        row={row}
      />
    ),
  }),
];
