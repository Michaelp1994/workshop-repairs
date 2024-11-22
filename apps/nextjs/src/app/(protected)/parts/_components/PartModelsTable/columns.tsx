import type { RouterOutputs } from "@repo/api/router";

import { Button } from "@repo/ui/button";
import { DataTableColumnHeader } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { Pencil, Trash2 } from "@repo/ui/icons";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

const columnHelper =
  createColumnHelper<
    RouterOutputs["partsToModels"]["getAllModelsByPartId"][number]
  >();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("model.name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model Name" />
    ),
    meta: {
      name: "Model Name",
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
  columnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <>
        <Button asChild size="sm" variant="link">
          <Link
            href={`${row.original.partId}/models/${row.original.modelId}`}
            scroll={false}
          >
            <Pencil className="size-4" />
          </Link>
        </Button>
        <Button asChild size="sm" variant="link">
          <Link
            href={`${row.original.partId}/models/${row.original.modelId}/archive`}
            scroll={false}
          >
            <Trash2 className="size-4" />
          </Link>
        </Button>
      </>
    ),
  }),
];
