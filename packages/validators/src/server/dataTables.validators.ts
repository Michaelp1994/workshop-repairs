import { z } from "zod";

import {
  columnFiltersSchema,
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
  columnFilters: columnFiltersSchema.default([]),
});

export type DataTableInput = z.input<typeof dataTableSchema>;
export type DataTableOutput = z.output<typeof dataTableSchema>;

export const dataTableCountSchema = z.object({
  globalFilter: globalFilterSchema.default(""),
  columnFilters: columnFiltersSchema.default([]),
});

export type DataTableCountInput = z.input<typeof dataTableCountSchema>;
export type DataTableCountOutput = z.output<typeof dataTableCountSchema>;

export const getSelectSchema = z.object({
  limit: z.number().min(1).max(100).optional().default(10),
  cursor: z.number().optional().default(0),
  direction: z.enum(["forward", "backward"]).default("forward"),
  globalFilter: globalFilterSchema.default(""),
  columnFilters: columnFiltersSchema.default([]),
});

export type GetSelectInput = z.infer<typeof getSelectSchema>;
