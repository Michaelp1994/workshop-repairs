import type { RepairTypeID } from "@repo/validators/ids.validators";

import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/react";

interface RepairTypeSelectProps extends Omit<ComboboxProps, "data"> {
  value: RepairTypeID;
}

const RepairTypeSelect = forwardRef<
  ElementRef<typeof Combobox>,
  RepairTypeSelectProps
>((props, ref) => {
  const { data, isLoading, isError } = api.repairTypes.getSelect.useQuery({});

  if (isError) {
    return <div>Error</div>;
  }

  return <Combobox data={data} isLoading={isLoading} ref={ref} {...props} />;
});

RepairTypeSelect.displayName = "RepairTypeSelect";
export default RepairTypeSelect;
