import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import { DataTableColumnHeader } from "@repo/ui/data-table";
import { DataTableHeaderCheckbox } from "@repo/ui/data-table";
import { DataTableRowCheckbox } from "@repo/ui/data-table";
import { Pencil, Trash2 } from "@repo/ui/icons";
import { createColumnHelper } from "@tanstack/react-table";

import type { RouterOutputs } from "../../../../backend/src/router";

import ArchivePartModelModal from "../modals/ArchivePartModelModal";
import UpdatePartModelModal from "../modals/UpdatePartModelModal";

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
    cell: ({ row }) => {
      async function showEditModal() {
        await NiceModal.show(UpdatePartModelModal, {
          partId: row.original.partId,
          modelId: row.original.modelId,
        });
      }
      async function showArchiveModal() {
        await NiceModal.show(ArchivePartModelModal, {
          partId: row.original.partId,
          modelId: row.original.modelId,
        });
      }
      return (
        <>
          <Button onClick={showEditModal} size="sm" variant="link">
            <Pencil className="size-4" />
          </Button>
          <Button onClick={showArchiveModal} size="sm" variant="link">
            <Trash2 className="size-4" />
          </Button>
        </>
      );
    },
  }),
];
