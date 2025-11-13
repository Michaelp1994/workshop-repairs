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
