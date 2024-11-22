import { ColumnFilters } from "@repo/validators/dataTables.validators";
import assert from "assert";
import { eq, inArray } from "drizzle-orm";

import { FilterMapping } from "../types";

export function createColumnFilterFunction(mappingArray: FilterMapping) {
  return function (columnFilters: ColumnFilters) {
    const filters = columnFilters.map((filter) => {
      if (filter.id in mappingArray) {
        const column = mappingArray[filter.id];
        assert(column, `Column ${filter.id} not found in mapping`);
        const value = filter.value;
        if (Array.isArray(value)) {
          return inArray(column, value);
        }
        return eq(column, filter.value);
      }
      return undefined;
    });
    return filters;
  };
}
