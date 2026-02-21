import { Combobox, type ComboboxProps } from "@repo/ui/combobox";

import { api } from "~/trpc/client";

export default function AssetStatusSelect(props: Omit<ComboboxProps, "data">) {
  const [data] = api.assetStatuses.getSelect.useSuspenseQuery({});
  return <Combobox data={data} {...props} />;
}
