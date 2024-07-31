import { type Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "@repo/ui/data-table";
import { api } from "~/trpc/react";

interface RepairsTableStatusFilterProps<T> {
  table: Table<T>;
}

export default function RepairsTableStatusFilter<T>({
  table,
}: RepairsTableStatusFilterProps<T>) {
  const { data, isLoading, isError } = api.repairStatusTypes.getSelect.useQuery(
    {},
  );
  const column = table.getColumn("status");
  if (!column) return null;
  if (isLoading) return null;
  if (isError) return null;
  return (
    <DataTableFacetedFilter column={column} title="Status" options={data} />
  );
}
