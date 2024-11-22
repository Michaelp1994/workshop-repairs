import type { RepairTypeID } from "@repo/validators/ids.validators";

import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

interface RepairTypeSelectProps extends Omit<ComboboxProps, "data"> {
  value: RepairTypeID;
}

const RepairTypeSelect = forwardRef<
  ElementRef<typeof Combobox>,
  RepairTypeSelectProps
>((props, ref) => {
  const [data] = api.repairTypes.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

RepairTypeSelect.displayName = "RepairTypeSelect";
export default RepairTypeSelect;
