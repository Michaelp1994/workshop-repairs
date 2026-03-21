export type Prettify<T> = {
  [K in keyof T]: T[K];
} & NonNullable<unknown>;

export type CreateInput<T> = Prettify<
  Omit<
    T,
    | "localId"
    | "createdById"
    | "organizationId"
    | "updatedById"
    | "updatedAt"
    | "deletedById"
    | "createdAt"
    | "deletedAt"
  >
>;

export type UpdateInput<T> = Prettify<
  Partial<
    Omit<
      T,
      | "updatedById"
      | "updatedAt"
      | "organizationId"
      | "createdById"
      | "localId"
      | "deletedById"
      | "createdAt"
      | "deletedAt"
    >
  >
>;

export interface GetAllInput<T = Record<string, never> | undefined> {
  filters: T;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  globalFilter: string;
  sorting: {
    desc: boolean;
    id: string;
  }[];
  columnFilters: {
    id: string;
    value: unknown;
  }[];
}

export interface ColumnFilter {
  id: string;
  value: unknown;
}

export interface CountInput<T = Record<string, never> | undefined> {
  filters: T;
  globalFilter: string;
  columnFilters: ColumnFilter[];
}

export interface GetAllSimpleInput<T = Record<string, never> | undefined> {
  globalFilter: string;
  columnFilters: ColumnFilter[];
  filters: T;
}
