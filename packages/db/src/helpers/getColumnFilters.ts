import { ColumnFilters } from "@repo/validators/dataTables.validators";
import { eq, inArray } from "drizzle-orm";

import { FilterMapping } from "../types";

export function getColumnFilterParams(
  columnFilters: ColumnFilters,
  mappingArray: FilterMapping,
) {
  const filters = columnFilters.map((filter) => {
    if (filter.id in mappingArray) {
      const column = mappingArray[filter.id]!;
      const value = filter.value;
      if (Array.isArray(value)) {
        return inArray(column, value);
      }
      return eq(column, filter.value);
    }
    return undefined;
  });
  return filters;
}
