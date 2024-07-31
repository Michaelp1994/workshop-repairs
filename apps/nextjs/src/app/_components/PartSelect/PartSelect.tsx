import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type RepairID } from "@repo/validators/ids.validators";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/react";

interface PartSelectProps extends Omit<ComboboxProps, "data"> {
  repairId: RepairID;
}

const PartSelect = forwardRef<ElementRef<typeof Combobox>, PartSelectProps>(
  ({ repairId, ...props }, ref) => {
    const { data, isLoading, isError } = api.parts.getSelect.useQuery({
      repairId,
    });

    if (isError) {
      return <div>Error</div>;
    }

    return <Combobox data={data} isLoading={isLoading} ref={ref} {...props} />;
  },
);

PartSelect.displayName = "PartSelect";
export default PartSelect;
