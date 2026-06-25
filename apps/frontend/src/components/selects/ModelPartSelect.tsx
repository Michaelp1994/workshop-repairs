import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ModelID } from "~/validators/ids.validators";

import { api } from "~/trpc/client";

interface ModelPartSelectProps extends Omit<ComboboxProps, "data"> {
  modelId: ModelID;
}

export default function ModelPartSelect({
  modelId,
  ...props
}: ModelPartSelectProps) {
  const [data] = api.partsToModels.getPartsByModelIdSelect.useSuspenseQuery({
    modelId,
  });
  return <Combobox data={data} {...props} />;
}
