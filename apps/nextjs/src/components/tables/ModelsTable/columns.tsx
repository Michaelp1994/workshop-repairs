import type { RouterOutputs } from "@repo/api/root";

import { DataTableColumnHeader } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { DataTableRowActions } from "@repo/ui/data-table";
import { DataTableImageCell } from "@repo/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "~/utils/formatDate";
import { getBaseUrl } from "~/utils/getBaseUrl";

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
  columnHelper.accessor("equipmentType.name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equipment Type" />
    ),
    meta: {
      name: "Equipment Type",
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
        generateUrl={(row) => `${getBaseUrl()}/models/${row.original.id}`}
        row={row}
      />
    ),
  }),
];
