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
  const [parts] = api.partsToModels.getPartsByModelIdSelect.useSuspenseQuery({
    modelId,
  });

  return <Combobox data={parts} ref={ref} {...props} />;
});

ModelPartSelect.displayName = "ModelPartSelect";

export default ModelPartSelect;
