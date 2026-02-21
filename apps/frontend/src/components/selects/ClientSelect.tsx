import { Combobox, type ComboboxProps } from "@repo/ui/combobox";

import { api } from "~/trpc/client";

export default function ClientSelect(props: Omit<ComboboxProps, "data">) {
  const [data] = api.clients.getSelect.useSuspenseQuery({});
  return <Combobox data={data} {...props} />;
}
