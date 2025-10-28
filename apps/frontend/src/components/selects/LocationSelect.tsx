import { Combobox, type ComboboxProps } from "@repo/ui/combobox";

import { api } from "~/trpc/client";

export default function LocationSelect(props: Omit<ComboboxProps, "data">) {
  const [data] = api.locations.getSelect.useSuspenseQuery({});
  return <Combobox data={data} {...props} />;
}
