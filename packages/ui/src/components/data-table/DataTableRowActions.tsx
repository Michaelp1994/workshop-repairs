import { type Row, RowData } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "../button";

interface DataTableRowActionsProps<TData extends RowData> {
  row: Row<TData>;
  generateUrl?: (row: Row<TData>) => string;
}

export function DataTableRowActions<TData extends RowData>({
  row,
  generateUrl,
}: DataTableRowActionsProps<TData>) {
  const url = generateUrl ? generateUrl(row) : `${row.original.id}`;

  return (
    <div className="flex justify-end">
      <Button asChild variant="ghost">
        <Link href={url}>
          <ChevronRight className="" />
        </Link>
      </Button>
    </div>
  );
}
