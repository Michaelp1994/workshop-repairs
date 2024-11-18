import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const ModelSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data" | "isLoading">
>((props, ref) => {
  const { data = [], isLoading, isError } = api.models.getSelect.useQuery({});

  if (isError) {
    return <div>Error</div>;
  }

  return <Combobox data={data} isLoading={isLoading} ref={ref} {...props} />;
});

ModelSelect.displayName = "ModelSelect";
export default ModelSelect;
