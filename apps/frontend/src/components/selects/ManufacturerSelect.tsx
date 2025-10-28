import { Combobox, type ComboboxProps } from "@repo/ui/combobox";

import { api } from "~/trpc/client";

export default function ManufacturerSelect(props: Omit<ComboboxProps, "data">) {
  const [data] = api.manufacturers.getSelect.useSuspenseQuery({});
  return <Combobox data={data} {...props} />;
}
