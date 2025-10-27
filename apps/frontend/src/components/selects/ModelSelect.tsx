import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const ModelSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data" | "isLoading">
>((props, ref) => {
  const [data] = api.models.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

ModelSelect.displayName = "ModelSelect";
export default ModelSelect;
