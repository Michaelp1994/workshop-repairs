import { DataTableFacetedFilter } from "@repo/ui/data-table";
import { type Table } from "@tanstack/react-table";

import { api } from "~/trpc/client";

interface RepairsTableStatusFilterProps<T> {
  table: Table<T>;
}

export default function RepairsTableStatusFilter<T>({
  table,
}: RepairsTableStatusFilterProps<T>) {
  const [data] = api.repairStatusTypes.getSelect.useSuspenseQuery({});
  const column = table.getColumn("status");
  if (!column) return null;
  return (
    <DataTableFacetedFilter column={column} options={data} title="Status" />
  );
}
