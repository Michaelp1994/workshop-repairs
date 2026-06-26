import { type InferSelectModel } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

export type OrderMapping = Record<string, PgColumn>;
export type FilterMapping = Record<string, PgColumn>;

export type OmitSome<T, K extends keyof T> = Omit<T, K>;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & NonNullable<unknown>;

export type RemoveNull<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};

export type RemoveNullSome<T, K extends keyof T> = RemoveNull<Pick<T, K>> &
  Partial<Omit<T, K>>;

export type RemoveUndefined<T> = {
  [P in keyof T]: Exclude<T[P], undefined>;
};

export type RequireSome<T, K extends keyof T> = T & Required<Pick<T, K>>;

interface BaseType {
  id?: string | number;
  localId?: number;
  createdById?: number | null | undefined;
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
    RequireSome<T, "createdAt" | "createdById">,
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

export interface Pagination {
  pageIndex: number;
  pageSize: number;
}

export interface Sorting {
  id: string;
  desc: boolean;
}

export interface ColumnFilter {
  id: string;
  value: unknown;
}

export interface GetAllInput<T = Record<string, never> | undefined> {
  pagination: Pagination;
  sorting: Sorting[];
  globalFilter: string;
  columnFilters: ColumnFilter[];
  filters: T;
}

export interface CountInput<T = Record<string, never> | undefined> {
  globalFilter: string;
  columnFilters: ColumnFilter[];
  filters: T;
}

export interface GetAllSimpleInput<T = Record<string, never> | undefined> {
  globalFilter: string;
  columnFilters: ColumnFilter[];
  filters: T;
}

export type { InferSelectModel as InferModel };
