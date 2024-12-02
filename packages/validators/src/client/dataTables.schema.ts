import { z } from "zod";

import {
  columnFiltersSchema,
  columnVisibilitySchema,
  globalFilterSchema,
  paginationSchema,
  sortingSchema,
} from "../isomorphic/dataTables.schema";

export const dataTableSchema = z.object({
  pagination: paginationSchema.default({
    pageIndex: 0,
    pageSize: 10,
  }),
  globalFilter: globalFilterSchema.default(""),
  sorting: sortingSchema.default([]),
  columns: columnVisibilitySchema.default({}),
  columnFilters: columnFiltersSchema.default([]),
});

export type DataTableInput = z.input<typeof dataTableSchema>;
export type DataTableOutput = z.output<typeof dataTableSchema>;

export const dataTableCountSchema = z.object({
  globalFilter: globalFilterSchema.default(""),
  columns: columnVisibilitySchema.default({}),
  columnFilters: columnFiltersSchema.default([]),
});

export type DataTableCountInput = z.infer<typeof dataTableCountSchema>;

export const getSelectSchema = z.object({
  limit: z.number().min(1).max(100).optional().default(10),
  cursor: z.number().optional().default(0),
  direction: z.enum(["forward", "backward"]).default("forward"),
  globalFilter: globalFilterSchema.default(""),
  columnFilters: columnFiltersSchema.default([]),
});

export type GetSelectInput = z.infer<typeof getSelectSchema>;
