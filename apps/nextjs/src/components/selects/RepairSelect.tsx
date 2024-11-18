import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const RepairSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const [data] = api.repairs.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

RepairSelect.displayName = "RepairSelect";
export default RepairSelect;
