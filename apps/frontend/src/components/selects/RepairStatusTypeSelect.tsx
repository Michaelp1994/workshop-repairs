import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const RepairStatusTypeSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const [data] = api.repairStatusTypes.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

RepairStatusTypeSelect.displayName = "RepairStatusTypeSelect";
export default RepairStatusTypeSelect;
