import { Combobox, type ComboboxProps } from "@repo/ui/combobox";

import { api } from "~/trpc/client";

export default function EquipmentTypeSelect(
  props: Omit<ComboboxProps, "data">,
) {
  const [data] = api.equipmentTypes.getSelect.useSuspenseQuery({});
  return <Combobox data={data} {...props} />;
}
