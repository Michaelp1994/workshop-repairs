import type { RouterOutputs } from "@repo/api/router";

import { DataTableColumnHeader } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { DataTableRowActions } from "@repo/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";

import { getBaseUrl } from "~/utils/getBaseUrl";
const columnHelper =
  createColumnHelper<
    RouterOutputs["partsToModels"]["getAllPartsByModelId"][number]
  >();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("part.partNumber", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Part Number" />
    ),
    meta: {
      name: "Part Number",
    },
  }),
  columnHelper.accessor("part.name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Part Name" />
    ),
    meta: {
      name: "Name",
    },
  }),
  columnHelper.accessor("quantity", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    meta: {
      name: "Quantity",
    },
  }),
  // columnHelper.display({
  //   id: "id",
  //   enableHiding: false,
  //   cell: ({ row }) => (
  //     <DataTableRowActions
  //       generateUrl={(row) => `${getBaseUrl()}/parts/${row.original.partId}`}
  //       row={row}
  //     />
  //   ),
  // }),
];
