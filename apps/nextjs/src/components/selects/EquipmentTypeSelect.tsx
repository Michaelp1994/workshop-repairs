import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const EquipmentTypeSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const [data] = api.equipmentTypes.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

EquipmentTypeSelect.displayName = "EquipmentTypeSelect";

export default EquipmentTypeSelect;
