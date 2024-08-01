import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type RepairID } from "@repo/validators/ids.validators";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/react";

interface ModelPartSelectProps extends Omit<ComboboxProps, "data"> {
  repairId: RepairID;
}

const ModelPartSelect = forwardRef<
  ElementRef<typeof Combobox>,
  ModelPartSelectProps
>(({ repairId, ...props }, ref) => {
  const { data, isLoading, isError } = api.partsToModels.getSelect.useQuery({
    columnFilters: [{ id: "repair_id", value: repairId }],
  });

  if (isError) {
    return <div>Error</div>;
  }

  return <Combobox data={data} isLoading={isLoading} ref={ref} {...props} />;
});

ModelPartSelect.displayName = "ModelPartSelect";

export default ModelPartSelect;
