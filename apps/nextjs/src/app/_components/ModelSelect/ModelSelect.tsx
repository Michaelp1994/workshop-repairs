import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";
import { api } from "~/trpc/react";

const ModelSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data" | "isLoading">
>((props, ref) => {
  const { data, isLoading, isError } = api.models.getSelect.useQuery({});

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Combobox ref={ref} isLoading={isLoading} data={data ?? []} {...props} />
  );
});

ModelSelect.displayName = "ModelSelect";
export default ModelSelect;
