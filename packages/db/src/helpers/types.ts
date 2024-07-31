interface PaginationInput {
  pageIndex: number;
  pageSize: number;
}

interface SortingInput {
  desc: boolean;
  id: string;
}

interface ColumnFilter {
  id: string;
  value?: unknown;
}

type GlobalFilterInput = string;

export interface GetAll {
  pagination: PaginationInput;
  globalFilter: GlobalFilterInput;
  sorting: SortingInput[];
  columnFilters: ColumnFilter[];
}

export interface GetCount {
  globalFilter: GlobalFilterInput;
  columnFilters: ColumnFilter[];
}

export interface GetSelect {
  globalFilter: GlobalFilterInput;
  columnFilters: ColumnFilter[];
}
