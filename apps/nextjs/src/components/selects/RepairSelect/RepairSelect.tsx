import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/react";

const RepairSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const { data, isLoading, isError } = api.repairs.getSelect.useQuery({});

  if (isError) {
    return <div>Error</div>;
  }

  return <Combobox data={data} isLoading={isLoading} ref={ref} {...props} />;
});

RepairSelect.displayName = "RepairSelect";
export default RepairSelect;
