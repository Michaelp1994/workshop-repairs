import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import {
  DataTableColumnHeader,
  DataTableHeaderCheckbox,
  DataTableRowActions,
  DataTableRowCheckbox,
} from "@repo/ui/data-table";
import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "~/utils/formatDate";
import getInitials from "~/utils/getInitials";

import type { RouterOutputs } from "../../../../backend/src/router";

const columnHelper =
  createColumnHelper<RouterOutputs["users"]["getAll"][number]>();

export const columns = [
  columnHelper.display({
    id: "selection",
    enableHiding: false,
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
  }),
  columnHelper.accessor("firstName", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={row.original.image ?? undefined} />
          <AvatarFallback>
            {getInitials(row.original.firstName, row.original.lastName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-bold">
            <Link
              className="font-bold hover:underline"
              params={{ userId: row.original.id }}
              to="/users/$userId"
            >
              {row.original.firstName} {row.original.lastName}
            </Link>
          </div>
          <div className="text-muted-foreground">{row.original.email}</div>
        </div>
      </div>
    ),
    meta: {
      name: "Name",
    },
  }),

  columnHelper.accessor("type.name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    meta: {
      name: "Role",
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
    id: "id",
    enableHiding: false,
    cell: ({ row }) => (
      <DataTableRowActions
        generateUrl={(row) => `/users/${row.original.id}`}
        row={row}
      />
    ),
  }),
];
