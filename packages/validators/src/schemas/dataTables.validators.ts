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
    // value: z.union([z.number(), z.string(), z.number().array()]),
    value: z.unknown(),
  })
  .array();

export type ColumnFilters = z.infer<typeof columnFiltersSchema>;

export const getAllSchema = z.object({
  pagination: paginationSchema.default({
    pageIndex: 0,
    pageSize: 10,
  }),
  globalFilter: globalFilterSchema.default(""),
  sorting: sortingSchema.default([]),
  columns: columnVisibilitySchema.default({}),
  columnFilters: columnFiltersSchema.default([]),
});

export type GetAllInput = z.infer<typeof getAllSchema>;

export const getCountSchema = z.object({
  globalFilter: globalFilterSchema.default(""),
  columns: columnVisibilitySchema.default({}),
  columnFilters: columnFiltersSchema.default([]),
});

export type GetCountInput = z.infer<typeof getCountSchema>;

export const getSelectSchema = z.object({
  globalFilter: globalFilterSchema.default(""),
  columnFilters: columnFiltersSchema.default([]),
});

export type GetSelectInput = z.infer<typeof getSelectSchema>;
