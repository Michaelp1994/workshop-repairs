import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const ClientSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const [data] = api.clients.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

ClientSelect.displayName = "ClientSelect";

export default ClientSelect;
