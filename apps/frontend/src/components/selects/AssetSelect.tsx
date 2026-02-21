import { Combobox, type ComboboxProps } from "@repo/ui/combobox";

import { api } from "~/trpc/client";

export default function AssetSelect(props: Omit<ComboboxProps, "data">) {
  const [data] = api.assets.getSelect.useSuspenseQuery({});
  return <Combobox data={data} {...props} />;
}
