import type {
  OmitSome,
  Prettify,
  RemoveNullSome,
  RequireSome,
} from "@repo/validators/types";

import { type InferSelectModel } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

export type OrderMapping = Record<string, PgColumn>;
export type FilterMapping = Record<string, PgColumn>;

interface BaseType {
  id?: string | number;
  localId?: number;
  createdById: number;
  createdAt?: Date | undefined;
  deletedAt?: Date | null | undefined;
  deletedById?: number | null | undefined;
  updatedAt?: Date | null | undefined;
  updatedById?: number | null | undefined;
}

type OmitKeys<T extends BaseType> = OmitSome<
  T,
  "createdAt" | "createdById" | "deletedAt" | "deletedById" | "id" | "localId"
>;

type RequireKeys<T extends OmitKeys<BaseType>> = RequireSome<
  T,
  "updatedAt" | "updatedById"
>;

type RemoveNullKeys<T extends OmitKeys<BaseType>> = RemoveNullSome<
  RequireKeys<T>,
  "updatedAt" | "updatedById"
>;

export type CreateInput<T extends BaseType> = Prettify<
  Omit<
    RequireSome<T, "createdAt">,
    "id" | "updatedById" | "updatedAt" | "deletedAt" | "deletedById"
  >
>;

export type UpdateInput<T extends BaseType> = Prettify<
  RemoveNullKeys<OmitKeys<T>>
>;

export type ArchiveInput<T extends BaseType> = Prettify<
  RemoveNullSome<
    RequireSome<
      Pick<T, "deletedAt" | "deletedById">,
      "deletedAt" | "deletedById"
    >,
    "deletedAt" | "deletedById"
  >
>;

// Data tables

interface Pagination {
  pageIndex: number;
  pageSize: number;
}

interface Sorting {
  id: string;
  desc: boolean;
}

interface ColumnFilter {
  id: string;
  value: unknown;
}

export interface BaseDataTableQuery {
  pagination: Pagination;
  sorting: Sorting[];
  globalFilter: string;
  columnFilters: ColumnFilter[];
}

export interface BaseCountQuery {
  globalFilter: string;
  columnFilters: ColumnFilter[];
}

export type { InferSelectModel as InferModel };
