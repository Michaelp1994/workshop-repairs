import { Combobox, type ComboboxProps } from "@repo/ui/combobox";

import { api } from "~/trpc/client";

export default function RepairSelect(props: Omit<ComboboxProps, "data">) {
  const [data] = api.repairs.getSelect.useSuspenseQuery({});
  return <Combobox data={data} {...props} />;
}
