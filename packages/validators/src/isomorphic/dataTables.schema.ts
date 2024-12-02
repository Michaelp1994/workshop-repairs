import { z } from "zod";

export const paginationSchema = z.object({
  pageIndex: z.number().int().nonnegative(),
  pageSize: z.number().int().positive(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

export const sortingSchema = z
  .object({
    desc: z.boolean(),
    id: z.string(),
  })
  .array();

export type SortingInput = z.infer<typeof sortingSchema>;

export const columnVisibilitySchema = z.record(z.string(), z.boolean());

export type ColumnVisibilityInput = z.infer<typeof columnVisibilitySchema>;

export const globalFilterSchema = z.string();

export type GlobalFilter = z.infer<typeof globalFilterSchema>;

export const columnFiltersSchema = z
  .object({
    id: z.string(),
    value: z.unknown(),
  })
  .array();

export type ColumnFilters = z.infer<typeof columnFiltersSchema>;

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
