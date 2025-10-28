import { Combobox, type ComboboxProps } from "@repo/ui/combobox";

import { api } from "~/trpc/client";

export default function RepairTypeSelect(props: Omit<ComboboxProps, "data">) {
  const [data] = api.repairTypes.getSelect.useSuspenseQuery({});
  return <Combobox data={data} {...props} />;
}
