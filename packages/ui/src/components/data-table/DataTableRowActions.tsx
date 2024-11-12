import { type Row } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "../button";

interface Data {
  id: number;
  [key: string]: unknown;
}

interface DataTableRowActionsProps<TData extends Data> {
  row: Row<TData>;
  generateUrl?: (row: Row<TData>) => string;
}

export function DataTableRowActions<TData extends Data>({
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
