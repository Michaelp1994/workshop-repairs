import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const AssetStatusSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data" | "isLoading">
>((props, ref) => {
  const [data] = api.assetStatuses.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

AssetStatusSelect.displayName = "AssetStatusSelect";
export default AssetStatusSelect;
