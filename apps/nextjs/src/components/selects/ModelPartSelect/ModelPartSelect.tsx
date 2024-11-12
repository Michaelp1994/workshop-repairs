import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ModelID } from "@repo/validators/ids.validators";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

interface ModelPartSelectProps extends Omit<ComboboxProps, "data"> {
  modelId: ModelID;
}

const ModelPartSelect = forwardRef<
  ElementRef<typeof Combobox>,
  ModelPartSelectProps
>(({ modelId, ...props }, ref) => {
  const { data, isLoading, isError } = api.partsToModels.getSelect.useQuery({
    columnFilters: [{ id: "model_id", value: modelId }],
  });

  if (isError) {
    return <div>Error</div>;
  }

  return <Combobox data={data} isLoading={isLoading} ref={ref} {...props} />;
});

ModelPartSelect.displayName = "ModelPartSelect";

export default ModelPartSelect;
