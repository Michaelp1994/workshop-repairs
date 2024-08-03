import type {
  OmitSome,
  Prettify,
  RemoveNull,
  RemoveNullSome,
  RequireSome,
} from "@repo/validators/types";

import {
  type InferInsertModel,
  type InferSelectModel,
  type Table,
} from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

export type OrderMapping = Record<string, PgColumn>;
export type FilterMapping = Record<string, PgColumn>;

interface BaseType {
  id?: string | number;
  updatedAt?: string | number | null;
  updatedById?: string | number | null;
  createdById?: string | number | null;
  createdAt?: string | number | null;
  deletedAt?: string | number | null;
  deletedById?: string | number | null;
}

type OmitKeys<T extends BaseType> = OmitSome<
  T,
  "createdAt" | "createdById" | "deletedAt" | "deletedById"
>;

type RequireKeys<T extends OmitKeys<BaseType>> = RequireSome<
  T,
  "id" | "updatedAt" | "updatedById"
>;

type RemoveNullKeys<T extends OmitKeys<BaseType>> = RemoveNullSome<
  RequireKeys<T>,
  "updatedAt" | "updatedById" | "id"
>;

type UpdateInput<T extends BaseType> = RemoveNullKeys<OmitKeys<T>>;

type InferUpdateModel<
  TTable extends Table,
  TConfig extends {
    dbColumnNames: boolean;
  } = {
    dbColumnNames: false;
  },
> = Prettify<UpdateInput<InferInsertModel<TTable, TConfig>>>;

type DeleteInput<T extends BaseType> = Required<
  RemoveNull<Pick<T, "id" | "deletedById" | "deletedAt">>
>;

type InferArchiveModel<
  TTable extends Table,
  TConfig extends {
    dbColumnNames: boolean;
  } = {
    dbColumnNames: false;
  },
> = Prettify<DeleteInput<InferInsertModel<TTable, TConfig>>>;

type CreateInput<T extends BaseType> = Omit<
  T,
  "id" | "updatedAt" | "updatedById" | "deletedById" | "deletedAt"
>;

type InferCreateModel<
  TTable extends Table,
  TConfig extends {
    dbColumnNames: boolean;
  } = {
    dbColumnNames: false;
  },
> = CreateInput<InferInsertModel<TTable, TConfig>>;

export type {
  InferArchiveModel,
  InferCreateModel,
  InferSelectModel as InferModel,
  InferUpdateModel,
};
