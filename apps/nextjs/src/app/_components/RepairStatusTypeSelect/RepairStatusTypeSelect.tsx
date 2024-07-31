import { Combobox, type ComboboxProps } from "@repo/ui/combobox";;
import { type ElementRef, forwardRef } from "react";
import { api } from "~/trpc/react";

const RepairStatusTypeSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const { data, isLoading, isError } = api.repairStatusTypes.getSelect.useQuery(
    {},
  );

  if (isError) {
    return <div>Error</div>;
  }

  return <Combobox ref={ref} isLoading={isLoading} data={data} {...props} />;
});

RepairStatusTypeSelect.displayName = "RepairStatusTypeSelect";
export default RepairStatusTypeSelect;
