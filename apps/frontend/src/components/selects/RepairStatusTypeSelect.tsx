import { Combobox, type ComboboxProps } from "@repo/ui/combobox";

import { api } from "~/trpc/client";

export default function RepairStatusTypeSelect(
  props: Omit<ComboboxProps, "data">,
) {
  const [data] = api.repairStatusTypes.getSelect.useSuspenseQuery({});
  return <Combobox data={data} {...props} />;
}
