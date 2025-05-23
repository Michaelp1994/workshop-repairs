import { SortingInput } from "@repo/validators/dataTables.schema";
import { asc, desc } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

type ColumnMapping = Record<string, PgColumn>;

export function createOrderByFunction(mapping: ColumnMapping) {
  return function (sorting: SortingInput) {
    if (sorting.length === 0) {
      return [];
    }
    const orderByParams = sorting
      .filter(({ id }) => id in mapping)
      .map(({ id, desc: isDescending }) => {
        const direction = isDescending ? desc : asc;
        const column = mapping[id];
        if (!column) {
          throw Error(`cannot sort by column: ${column}`);
        }
        return direction(column);
      });

    return orderByParams;
  };
}
