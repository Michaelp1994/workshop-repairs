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
  const [data] = api.partsToModels.getSelect.useSuspenseQuery({
    columnFilters: [{ id: "model_id", value: modelId }],
  });

  return <Combobox data={data} ref={ref} {...props} />;
});

ModelPartSelect.displayName = "ModelPartSelect";

export default ModelPartSelect;
