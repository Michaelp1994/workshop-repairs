import { Combobox, type ComboboxProps } from "@repo/ui/combobox";

import { api } from "~/trpc/client";

export default function ModelSelect(props: Omit<ComboboxProps, "data">) {
  const [data] = api.models.getSelect.useSuspenseQuery({});
  return <Combobox data={data} {...props} />;
}
