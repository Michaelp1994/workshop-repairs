import { Combobox, type ComboboxProps } from "@repo/ui/combobox";;
import { type ElementRef, forwardRef } from "react";
import { api } from "~/trpc/react";

const ClientSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const { data, isLoading, isError } = api.clients.getSelect.useQuery({});

  if (isError) {
    return <div>Error</div>;
  }

  return <Combobox ref={ref} data={data} isLoading={isLoading} {...props} />;
});

ClientSelect.displayName = "ClientSelect";

export default ClientSelect;
