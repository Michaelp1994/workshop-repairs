import {
  type ComboboxProps,
  InfiniteCombobox,
} from "@repo/ui/infinite-combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const InfiniteAssetSelect = forwardRef<
  ElementRef<typeof InfiniteCombobox>,
  Omit<
    ComboboxProps,
    "data" | "fetchNextPage" | "isFetchingNextPage" | "isLoading"
  >
>((props, ref) => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    api.assets.getSelect.useInfiniteQuery(
      {
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialCursor: 0,
      },
    );

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <InfiniteCombobox
      {...props}
      data={data}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      ref={ref}
    />
  );
});

InfiniteAssetSelect.displayName = "InfiniteAssetSelect";

export default InfiniteAssetSelect;
