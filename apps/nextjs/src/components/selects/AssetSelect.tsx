import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const AssetSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const [data] = api.assets.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

AssetSelect.displayName = "AssetSelect";

export default AssetSelect;
