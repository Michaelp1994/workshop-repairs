export type Prettify<T> = {
  [K in keyof T]: T[K];
} & NonNullable<unknown>;

export type OmitSome<T, K extends keyof T> = Omit<T, K>;

export type RequireSome<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type RemoveNull<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};

export type RemoveNullSome<T, K extends keyof T> = RemoveNull<Pick<T, K>> &
  Partial<Omit<T, K>>;

export type RemoveUndefined<T> = {
  [P in keyof T]: Exclude<T[P], undefined>;
};
