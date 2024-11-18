import { flexRender, type Table as iTable } from "@tanstack/react-table";

import { cn } from "../../lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  table: iTable<T>;
  noResultsText?: string;
}

export function DataTable<T>({
  table,
  noResultsText = "No Results!",

  className,
  ...props
}: DataTableProps<T>) {
  const numRows = table.getRowCount();
  const numCols = table.getAllColumns().length;
  return (
    <div className={cn("border-y", className)} {...props}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {numRows > 0 ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={numCols}>
                {noResultsText}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
