import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const ClientSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const { data, isLoading, isError } = api.clients.getSelect.useQuery({});

  if (isError) {
    return <div>Error</div>;
  }

  return <Combobox data={data} isLoading={isLoading} ref={ref} {...props} />;
});

ClientSelect.displayName = "ClientSelect";

export default ClientSelect;
